In Synx, every fund movement must be attributed to a specific **"Account."** This is our core **Account-Centric Logic**: you first create an account, and then use "Add Transaction" to modify its balance.

After tapping the **"+"** button > **Add Transaction**, the system will ask you to select an account. The interface and workflow will adapt based on the account type you choose:

## 1. Non-Investment Transactions
(For Cash, Bank, or Credit Card accounts)

You will see three main options:

* **Income / Expense:**
    * **Category:** Select a category for the transaction (e.g., Food, Housing, Transport, Entertainment).
    * **Amount:** Enter the value to directly increase or decrease the account balance.

* **Transfer:**
    * Move funds from one account to another (e.g., withdrawing cash from an ATM moves money from Bank to Wallet).
    * ⚠️ **Restriction:** Transfers are currently limited to accounts with the **Same Currency**.
    * **Tip for Currency Exchange:** To record a currency exchange (e.g., TWD to USD), please record it manually as two separate transactions:
        1.  Add an **"Expense"** in the TWD account.
        2.  Add an **"Income"** in the USD account.

## 2. Investment Transactions
(For Stock, Crypto, or Precious Metal accounts)

If you select an investment account (e.g., TSLA or Bitcoin), the system switches to the **Investment Interface**. In addition to entering shares and cost, you can link the transaction to a funding source:

* **Buy: Set Payment Source**
    * You must select a **"Source Account"** (e.g., your bank settlement account).
    * **Logic:** The system will automatically *deduct* the cost from the Source Account and *increase* the holdings in your Investment Account.

* **Sell: Set Deposit Destination**
    * You must select a **"Destination Account."**
    * **Logic:** The system will *deduct* the holdings from your Investment Account and *deposit* the proceeds (cash) into the Destination Account.