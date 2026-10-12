/** Create a tiny in-memory ledger. Entries are copied on input and output. */
export function createLedger(initialTransactions = []) {
  const transactions = initialTransactions.map((item) => ({ ...item }));

  return {
    add(transaction) {
      transactions.push({ ...transaction });
    },
    list() {
      return transactions.map((item) => ({ ...item }));
    },
  };
}
