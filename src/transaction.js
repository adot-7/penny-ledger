const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function isIsoCalendarDate(value) {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  if (year < 1 || month < 1 || month > 12) return false;
  const daysInMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month - 1];
  return day >= 1 && day <= daysInMonth;
}

/** Validate and copy one transaction record. */
export function assertTransaction(transaction) {
  if (!transaction || typeof transaction !== "object" || Array.isArray(transaction)) {
    throw new TypeError("Transaction must be an object");
  }

  for (const field of ["id", "description", "category"]) {
    if (typeof transaction[field] !== "string" || transaction[field].trim() === "") {
      throw new TypeError("Transaction " + field + " must be a non-empty string");
    }
  }
  if (!isIsoCalendarDate(transaction.date)) {
    throw new TypeError("Transaction date must be a real YYYY-MM-DD calendar date");
  }
  if (!Number.isSafeInteger(transaction.amountCents)) {
    throw new TypeError("Transaction amountCents must be a safe integer");
  }

  return { ...transaction };
}
