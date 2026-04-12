Synx supports importing transactions by pasting CSV text directly. Combined with Claude or ChatGPT, you can convert bank statements and brokerage records into the correct import format — no manual reformatting needed.

---

## Overview

1. Get the AI Prompt from the Synx import screen
2. Paste the Prompt along with your statement into an AI chat
3. Copy the CSV output from the AI
4. Paste it back into Synx to complete the import

---

## Step 1: Get the Prompt

Go to **Settings → Import Transaction CSV**, select the import type, tap **AI Prompt**, then tap **Copy Prompt** to copy the corresponding AI prompt.

You can also find the prompts at the bottom of this page in the **Prompt Reference** section.

> **Remember to fill in your account names**
>
> The prompt contains placeholders like `{{accounts}}` or `{{investmentAccounts}}` / `{{cashAccounts}}`. After copying, replace them with the actual account names you have in Synx — otherwise the import will fail to match accounts.

---

## Step 2: Give the Prompt and Statement to the AI

Open Claude or ChatGPT and in the chat box:

1. Paste the prompt you just copied
2. Attach your bank or brokerage statement — supported formats:
   - **Image** (screenshot or photo)
   - **PDF**
   - **Text** (paste directly)

After sending, the AI will output a correctly formatted CSV with no extra explanation.

> **Make sure your accounts exist before importing**
>
> Account names in the CSV must exactly match those in Synx, and each account's start date must be earlier than the earliest transaction date. See the "CSV Import" section for details.

---

## Step 3: Review the AI Output

Once you have the CSV, quickly check:

- Account names are correct (no typos, no extra spaces)
- Dates are in `yyyy-MM-dd` format
- Amount signs match expectations (positive = income, negative = expense)

If the AI output has errors, just tell it what's wrong in the same conversation and ask it to regenerate.

---

## Step 4: Import into Synx

1. Go back to the Synx import screen
2. Select **Text** mode
3. Paste the CSV content into the text box
4. Tap **Import**

A preview confirmation screen will appear showing the number of valid rows and any errors. Confirm to complete the import.

> **Rows with errors don't affect other data**
>
> If some rows have issues (e.g. account name mismatch), those rows are skipped while the rest import normally. The confirmation screen lists all error details.

---

## Prompt Reference

### Non-Investment Prompt

For bank account income, expenses, and transfers.

```
Please convert the attached bank statement into a CSV with exactly these columns:

Account,To Account,Date,Name,Amount,Note

Available accounts (you MUST use only these exact names):
{{accounts}}

Rules:
- Account: must be one of the available accounts listed above
- To Account: for transfers only, must also be one of the available accounts; otherwise leave empty
- Date: yyyy-MM-dd format
- Name: short transaction description
- Amount: positive for income/deposits, negative for expenses/withdrawals. Never 0.
- Note: any extra detail, or leave empty (always the last column)
- If a transaction cannot be matched to any available account, do NOT include it in the CSV. Instead, list it at the bottom as a comment line starting with "# Skipped: " followed by a brief description and the reason.
- First row must be the header
- Wrap the entire CSV output in a markdown code block (```csv ... ```)
- Only add explanations outside the code block if there are skipped rows or issues to report; otherwise output nothing else
- Write any explanations in: {{language}}

Custom rules (fill in your own if needed):
- # Example: Transactions from account "X" are always expenses — replace with your rule or delete
- # Example: Transfers between "A" and "B" should use To Account — replace with your rule or delete

---

**Example output:**
Account,To Account,Date,Name,Amount,Note
Cash,,2026-01-15,Salary,50000,January
Cash,,2026-01-20,Groceries,-1200,
Cash,Savings,2026-01-25,Transfer,5000,


**Reminders:**
- Account names are case-sensitive — must match Synx exactly
- Amount = 0 is invalid; that row will be skipped on import
- For transfers, put the same absolute amount in Amount; the direction is inferred from Account → To Account
- Rows with errors are skipped; valid rows in the same file still import fine
```

**Before using, replace the following placeholders in the prompt:**

- `{{accounts}}` → your account name list (e.g. `Cash`, `Savings`, `Checking`)
- `{{language}}` → the language you want the AI to use for explanations (e.g. `English`)
- Custom rules → fill in your own rules, or delete them

---

### Investment Prompt

For stocks, ETFs, crypto, and other brokerage records.

```
Please convert the attached brokerage statement into a CSV with exactly these columns:

Account,Funding Account,Date,Shares,Price,Amount,Tax,Note

Available investment accounts (for the Account column):
{{investmentAccounts}}

Available cash/non-investment accounts (for the Funding Account column):
{{cashAccounts}}

Rules:
- Account: must be one of the available investment accounts listed above
- Funding Account: the cash account that was debited (buy) or credited (sell); must be one of the available cash accounts, or leave empty if not tracked
- Date: yyyy-MM-dd format
- Shares: positive = buy, negative = sell. Never 0.
- Price: price per share, always positive
- Amount: the absolute cash amount moved in the Funding Account. Always >= 0. This is NOT necessarily |Shares| × Price; it reflects the actual cash movement including fees, partial fills, etc. Use 0 only for non-cash transactions (e.g. stock splits, bonus shares) where no cash changed hands.
- Tax: tax or commission paid (use 0 if none, never leave empty)
- Note: any extra detail, or leave empty (always the last column)
- If a transaction cannot be matched to any available account, do NOT include it in the CSV. Instead, list it at the bottom as a comment line starting with "# Skipped: " followed by a brief description and the reason.
- First row must be the header
- Wrap the entire CSV output in a markdown code block (```csv ... ```)
- Only add explanations outside the code block if there are skipped rows or issues to report; otherwise output nothing else
- Write any explanations in: {{language}}

Custom rules (fill in your own if needed):
- # Example: US stocks are always funded from account "X" — replace with your rule or delete
- # Example: TW stocks are always funded from account "Y" — replace with your rule or delete

---

**Example output:**
Account,Funding Account,Date,Shares,Price,Amount,Tax,Note
TSLA,Cash,2024-01-10,100,600,60000,0,
0050,Cash,2024-01-20,-50,650,32500,150,
BTC-USD,,2024-02-01,10,185,1850,0,


**Reminders:**
- Account names are case-sensitive — must match Synx exactly
- Shares positive = buy, negative = sell; never 0
- Amount = absolute cash moved in the Funding Account, always >= 0. Not necessarily |Shares| × Price. Use 0 for non-cash events (splits, bonus shares)
- Tax must not be empty — use 0 if no commission
```

**Before using, replace the following placeholders in the prompt:**

- `{{investmentAccounts}}` → your investment account name list (e.g. `TSLA`, `AAPL`, `BTC-USD`)
- `{{cashAccounts}}` → your cash/non-investment account name list (e.g. `Cash`, `Checking`)
- `{{language}}` → the language you want the AI to use for explanations (e.g. `English`)
- Custom rules → fill in your own rules, or delete them
