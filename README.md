# Penny Ledger

A small, dependency-free Node.js toolkit for working with personal transaction records.

Penny Ledger stores amounts as integer cents, keeps the ledger in memory, and provides a focused place to build safe import, reporting, and export workflows. The project is intentionally small: no database, framework, or third-party runtime packages.

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

Dates use ISO calendar format. Expenses are negative integer cents; income is positive. The current ledger API is an in-memory starting point. The open issues describe the next small, independently testable improvements.

## Development

Run the test suite with npm test. New behavior should include tests using Node's built-in test runner. No package installation is required.

## Roadmap

See the open issues for the next features: currency display, date and category filters, CSV export, monthly summaries, and safe import reconciliation.
