/** Return the signed ledger balance in integer cents. */
export function balanceCents(transactions) {
  if (!Array.isArray(transactions)) {
    throw new TypeError("Transactions must be an array");
  }

  let total = 0;
  for (const transaction of transactions) {
    if (!Number.isSafeInteger(transaction?.amountCents)) {
      throw new TypeError("Every transaction must have safe-integer amountCents");
    }
    total += transaction.amountCents;
    if (!Number.isSafeInteger(total)) {
      throw new RangeError("Ledger balance exceeds the safe integer range");
    }
  }
  return total;
}
