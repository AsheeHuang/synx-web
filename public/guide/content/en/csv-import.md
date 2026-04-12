This guide explains how to prepare a CSV file and use Synx's import feature to batch-import transaction data into your accounts.

---

## 1. Prerequisites

> ⚠️ Please verify the following before importing, or your data may not import correctly.

### Accounts must be created in advance

All account names referenced in the CSV (`Account`, `To Account`, `Funding Account`) **must already exist in Synx**, with names matching exactly (including capitalization and spaces). The import process will not create new accounts automatically.

- **Investment CSV**: `Account` must be an **investment account**; `Funding Account`, if provided, must be a **non-investment account**
- **Non-investment CSV**: `Account` and `To Account` must both be **non-investment accounts**

### Account start date must be before the CSV transaction dates

Each transaction date must be **later than** the corresponding account's start date, otherwise the row will be rejected. When creating accounts, make sure the start date is set before the earliest transaction you intend to import.

### Investment accounts must have positions set up

If importing investment transactions, the target investment account **must already have the corresponding position (symbol) configured**. If the position does not exist, the row will fail to write.

### Accounts must not be closed

Closed accounts cannot accept new transaction imports — any rows referencing a closed account will be skipped.

---

## 2. Investment CSV Format

Used for stock buy/sell records. Each row represents a single buy or sell operation.

> 💡 **The account name is the ticker symbol**
> Investment account names use the ticker symbol directly (e.g. `TSLA`, `0050`, `BTC-USD`). No separate Symbol column is needed in the CSV.

### Field Reference

| Field | Required | Description |
| --- | --- | --- |
| `Account` | ✓ | Investment account name (ticker symbol), must match Synx exactly |
| `Funding Account` | | The linked cash account (non-investment); if provided, a corresponding cash transaction is created automatically. Can be left empty |
| `Date` | ✓ | Date format: `yyyy-MM-dd` (e.g. `2024-01-10`) |
| `Shares` | ✓ | Number of shares; positive = buy, negative = sell. **Cannot be 0** |
| `Price` | ✓ | Price per share; positive for normal trades; `0` = stock split or dividend |
| `Amount` | ✓ | The actual amount added or removed from the Funding Account, **always positive**; use `0` for splits or dividends |
| `Tax` | | Tax or fees; use `0` if none. **Cannot be left empty** |
| `Note` | | Optional note; always the last column |

### Buy/Sell Logic

| Shares | Price | Action |
| --- | --- | --- |
| Positive | Positive | Buy |
| Negative | Positive | Sell |
| Positive or Negative | `0` | Stock split / Dividend |
| `0` | Any | Error — row will be skipped |

> ⚠️ **Amount reflects the actual change in the Funding Account**
>
> `Amount` is the **actual amount that changes in the Funding Account**, denominated in the Funding Account's currency. If the investment and funding accounts use different currencies (e.g. buying US stocks from a TWD account), `Amount` should be the TWD amount — not the USD market value. So `Amount` does not need to equal `Shares × Price`.

### Example

```csv
Account,Funding Account,Date,Shares,Price,Amount,Tax,Note
TSLA,Cash,2024-01-10,100,600,60000,0,
0050,Cash,2024-01-20,-50,650,32500,150,
BTC-USD,,2024-02-01,10,185,1850,0,
```

**Notes:**

- Row 1: Buy 100 shares of TSLA at 600 each; total cost 60,000 deducted from Cash account
- Row 2: Sell 50 shares of 0050 at 650 each; 32,500 credited to Cash, with 150 in taxes
- Row 3: Buy 10 BTC-USD units with no linked funding account (investment account only)

---

## 3. Non-Investment CSV Format

Used for general income/expense entries and transfers between accounts.

### Field Reference

| Field | Required | Description |
| --- | --- | --- |
| `Account` | ✓ | Non-investment account name, must match Synx exactly |
| `To Account` | | Target account for transfers (non-investment); if provided, the row is treated as a transfer; if empty, type is determined by Amount sign |
| `Date` | ✓ | Date format: `yyyy-MM-dd` (e.g. `2024-01-15`) |
| `Name` | ✓ | Transaction name or description |
| `Amount` | ✓ | Positive = income, negative = expense. **Cannot be 0** |
| `Note` | | Optional note; always the last column |

### Transaction Type Logic

- `To Account` is filled → **Transfer**
- `To Account` is empty, `Amount > 0` → **Income**
- `To Account` is empty, `Amount < 0` → **Expense**
- `Amount = 0` → Error — row will be skipped

### Example

```csv
Account,To Account,Date,Name,Amount,Note
Cash,,2026-01-15,Salary,50000,January
Cash,,2026-01-20,Groceries,-1200,
Cash,Savings,2026-01-25,Transfer,5000,
```

**Notes:**

- Row 1: Income of 50,000 in Cash account (salary)
- Row 2: Expense of 1,200 from Cash account (groceries)
- Row 3: Transfer 5,000 from Cash to Savings account

---

## 4. Common Errors

| Error | System Behavior |
| --- | --- |
| Missing required column header | Entire CSV stops parsing; no data is imported |
| Account name not found | Row skipped with error message |
| Wrong account type (e.g. investment account used in non-investment field) | Row skipped with error message |
| Invalid date format (not `yyyy-MM-dd`) | Row skipped with error message |
| Amount is 0 (non-investment) | Row skipped: "Amount cannot be zero" |
| Price = 0 and Amount = 0 (investment) | Treated as stock split or dividend; imported normally |
| Shares is 0 (investment) | Row skipped: "Shares must be greater than zero" |
| Account is closed | Row skipped with closed account message |
| Position not found in investment account | Write fails; counted in failure total |
| All rows have errors | Import button disabled; cannot proceed |
| Shares would go below 0 after sell | Import fails; shares cannot be negative |

Before writing, the system shows a preview confirmation window listing the number of valid rows and any error details. You must confirm before the actual import is executed.
