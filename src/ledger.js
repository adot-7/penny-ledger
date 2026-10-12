import { assertTransaction } from "./transaction.js";

/** Create an in-memory ledger with validated, uniquely identified entries. */
export function createLedger(initialTransactions = []) {
  if (!Array.isArray(initialTransactions)) {
    throw new TypeError("Initial transactions must be an array");
  }

  const transactions = new Map();
  for (const entry of initialTransactions) {
    const transaction = assertTransaction(entry);
    if (transactions.has(transaction.id)) {
      throw new RangeError("Duplicate transaction id: " + transaction.id);
    }
    transactions.set(transaction.id, transaction);
  }

  return {
    add(entry) {
      const transaction = assertTransaction(entry);
      if (transactions.has(transaction.id)) {
        throw new RangeError("Duplicate transaction id: " + transaction.id);
      }
      transactions.set(transaction.id, transaction);
      return { ...transaction };
    },
    list() {
      return [...transactions.values()].map((item) => ({ ...item }));
    },
    remove(id) {
      return transactions.delete(id);
    },
  };
}
