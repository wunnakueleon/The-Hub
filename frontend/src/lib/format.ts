const bahtFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function baht(amount: number): string {
  return bahtFormatter.format(amount);
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});

export function formatDate(dateStr: string): string {
  return dateFormatter.format(new Date(dateStr));
}

export function formatShortDate(dateStr: string): string {
  return shortDateFormatter.format(new Date(dateStr));
}

export function formatDateRange(startStr: string, endStr: string): string {
  const start = new Date(startStr);
  const end = new Date(endStr);

  // Same month: "7–14 Mar 2026"
  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    const day1 = start.getDate();
    const day2 = end.getDate();
    const month = start.toLocaleString("en-GB", { month: "short" });
    const year = start.getFullYear();
    return `${day1}–${day2} ${month} ${year}`;
  }

  // Different months: "28 Feb – 7 Mar 2026"
  return `${formatShortDate(startStr)} – ${formatShortDate(endStr)} ${end.getFullYear()}`;
}

export function spotsLeft(capacity: number, booked: number): number {
  return Math.max(0, capacity - booked);
}
