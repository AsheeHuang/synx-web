Understanding how Synx calculates your investment cost is key to interpreting the P&L figures on your dashboard accurately.

---

## 1. Core Algorithm: Weighted Average Cost

Synx uses a straightforward **Weighted Average** method to determine your cost basis. The logic works as follows:

### Buying: Accumulating Cost
When you purchase new shares, the system combines the new capital with your existing total cost to calculate a new average price per share.

### Selling: Proportional Deduction
When you sell shares, the system deducts the cost based on your **current average cost** at that moment to calculate the realized profit or loss.

### The Formula:
```
Final Average Cost = Remaining Total Cost / Remaining Shares
```

## 2. Scope & Limitations
To keep the system lightweight and transparent, the current algorithm does not automatically factor in the following variables:

Cash Dividends: Dividends are treated as cash income and do not automatically lower your average cost basis (unless you manually enter them as a negative cost, which is not recommended).

Inflation: All figures are nominal values and are not adjusted for inflation.

### 💡 Important Note
Since every brokerage may use different accounting principles (e.g., LIFO vs. FIFO) or handle transaction fees and taxes differently, the figures shown in Synx may differ slightly from your brokerage statement. This is normal; please use Synx as a personal reference for your overall asset allocation and trends.