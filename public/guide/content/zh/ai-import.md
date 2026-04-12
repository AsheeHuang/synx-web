Synx 支援直接貼上 CSV 文字進行匯入，搭配 Claude 或 ChatGPT，你可以把銀行對帳單、券商交割記錄，直接轉換成可匯入的格式，不需要手動整理。

---

## 流程概覽

1. 在 Synx 匯入介面取得 AI Prompt
2. 將 Prompt 與對帳單一起貼給 AI
3. 複製 AI 輸出的 CSV
4. 貼回 Synx 完成匯入

---

## 第一步：取得 Prompt

進入 **設定 → 匯入交易 CSV**，選擇匯入類型後，點選 **AI 提示詞**，再點 **複製提示詞** 複製對應的 AI Prompt。

你也可以直接從本文末的 **Prompt 參考** 區塊取得。

> **記得填入你的帳戶名稱**
>
> Prompt 中有 `{{accounts}}` 或 `{{investmentAccounts}}` / `{{cashAccounts}}` 的佔位符，複製後請替換成你在 Synx 中實際的帳戶名稱，否則匯入時會找不到帳戶。

---

## 第二步：將 Prompt 與對帳單交給 AI

打開 Claude 或 ChatGPT，在對話框中：

1. 貼上剛才複製的 Prompt
2. 附上你的對帳單——支援以下格式：
   - **圖片**（截圖或拍照）
   - **PDF**
   - **文字**（直接貼入）

送出後，AI 會直接輸出一份格式正確的 CSV，不含多餘說明。

> **匯入前請務必確認帳戶已建立**
>
> CSV 中的帳戶名稱必須與 Synx 中完全一致，且帳戶的開始日期必須早於最早一筆資料的日期。詳見「CSV 匯入」章節。

---

## 第三步：確認 AI 輸出

拿到 CSV 後，建議快速確認幾件事：

- 帳戶名稱是否正確（有沒有打錯、多空格）
- 日期格式是否為 `yyyy-MM-dd`
- 金額正負是否符合預期

如果 AI 輸出有誤，可以在對話中直接告訴它哪裡不對，請它重新輸出。

---

## 第四步：匯入 Synx

1. 回到 Synx 的匯入介面
2. 選擇 **Text** 模式
3. 將 CSV 內容貼入文字框
4. 點擊 **Import**

系統會顯示預覽確認視窗，列出可匯入的筆數與任何錯誤。確認無誤後點擊 **Import** 完成。

> **有錯誤的列不影響其他資料**
>
> 若部分列有問題（如帳戶名稱不符），系統會跳過那幾列，其餘資料仍正常匯入。確認視窗會列出所有錯誤明細。

---

## Prompt 參考

### 非投資交易提示詞 (Non-Investment)

適用於銀行帳戶的收支與轉帳記錄。

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

**使用前，請將 Prompt 中的以下欄位替換為實際內容：**

- `{{accounts}}` → 你的帳戶名稱清單（如 `Cash`, `玉山帳戶`, `儲蓄帳戶`）
- `{{language}}` → 你希望 AI 用哪種語言說明跳過的項目（如 `Traditional Chinese`）
- Custom rules → 填入你自己的對應規則，或直接刪除

---

### 投資交易提示詞 (Investment)

適用於股票、ETF、加密貨幣等券商交割記錄。

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

**使用前，請將 Prompt 中的以下欄位替換為實際內容：**

- `{{investmentAccounts}}` → 你的投資帳戶名稱清單（如 `TSLA`, `0050`, `BTC-USD`）
- `{{cashAccounts}}` → 你的現金／非投資帳戶名稱清單（如 `Cash`, `玉山帳戶`）
- `{{language}}` → 你希望 AI 用哪種語言說明跳過的項目（如 `Traditional Chinese`）
- Custom rules → 填入你自己的對應規則，或直接刪除
