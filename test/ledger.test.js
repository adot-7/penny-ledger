import test from "node:test";
import assert from "node:assert/strict";
import { createLedger } from "../src/ledger.js";
import { balanceCents } from "../src/balance.js";

const sample = {
  id: "txn-001",
  date: "2026-10-12",
  description: "Coffee",
  category: "Food",
  amountCents: -450,
};

test("ledger stores and returns transaction copies", () => {
  const ledger = createLedger([sample]);
  const listed = ledger.list();
  listed[0].description = "changed outside the ledger";
  ledger.add({ ...sample, id: "txn-002", description: "Lunch", amountCents: -850 });

  assert.equal(ledger.list().length, 2);
  assert.equal(ledger.list()[0].description, "Coffee");
  assert.equal(balanceCents(ledger.list()), -1300);
});

test("ledger validates entries and prevents duplicate IDs", () => {
  assert.throws(() => createLedger([{ ...sample, date: "2026-02-30" }]), /real YYYY-MM-DD/);

  const ledger = createLedger([sample]);
  assert.throws(() => ledger.add(sample), /Duplicate transaction id/);
  assert.throws(
    () => ledger.add({ ...sample, id: "txn-003", amountCents: Number.MAX_SAFE_INTEGER + 1 }),
    /safe integer/,
  );
});

test("ledger can remove an entry by ID", () => {
  const ledger = createLedger([sample]);
  assert.equal(ledger.remove("txn-001"), true);
  assert.equal(ledger.remove("txn-001"), false);
  assert.deepEqual(ledger.list(), []);
});

test("balance rejects malformed cents and unsafe totals", () => {
  assert.throws(() => balanceCents([{ amountCents: 1.5 }]), /safe-integer/);
  assert.throws(
    () => balanceCents([{ amountCents: Number.MAX_SAFE_INTEGER }, { amountCents: 1 }]),
    /safe integer range/,
  );
});
