import test from "node:test";
import assert from "node:assert/strict";
import { createLedger } from "../src/ledger.js";

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
  ledger.add({ ...sample, id: "txn-002", description: "Lunch" });

  assert.equal(ledger.list().length, 2);
  assert.equal(ledger.list()[0].description, "Coffee");
});
