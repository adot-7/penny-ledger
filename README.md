# Penny Ledger

A small, dependency-free Node.js toolkit for working with personal transaction records.

Penny Ledger validates transaction entries, keeps them in an in-memory ledger, and calculates signed balances in integer cents. The project stays intentionally small: no database, framework, or third-party runtime packages.

## Requirements

- Node.js 20 or newer
- npm

## Getting started

    git clone https://github.com/adot-7/penny-ledger.git
    cd penny-ledger
    npm test

## Transaction shape

    {
      id: "txn-001",
      date: "2026-10-12",
      description: "Coffee",
      category: "Food",
      amountCents: -450
    }

Dates use real ISO calendar dates. Expenses are negative integer cents; income is positive. The ledger validates required fields, prevents duplicate IDs, returns copies, and can calculate a balance without floating-point arithmetic.

The open roadmap issues add currency display, date and category filters, CSV export, monthly reporting, and safe import reconciliation.

## Development

Run the test suite with npm test. New behavior should include tests using Node's built-in test runner. No package installation is required.
