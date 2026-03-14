interface EventDateParts {
  date?: string | null;
  dateMode?: string | null;
  eventMonth?: number | null;
  eventYear?: number | null;
}

const monthNamesLong = [
  "ianuarie",
  "februarie",
  "martie",
  "aprilie",
  "mai",
  "iunie",
  "iulie",
  "august",
  "septembrie",
  "octombrie",
  "noiembrie",
  "decembrie",
];

const monthNamesShort = [
  "ian.",
  "feb.",
  "mar.",
  "apr.",
  "mai",
  "iun.",
  "iul.",
  "aug.",
  "sep.",
  "oct.",
  "nov.",
  "dec.",
];

export function formatEventDate(
  eventDate: EventDateParts,
  variant: "long" | "short" = "long"
) {
  if (eventDate.dateMode === "month") {
    if (eventDate.eventMonth && eventDate.eventYear) {
      const months = variant === "short" ? monthNamesShort : monthNamesLong;
      return `${months[eventDate.eventMonth - 1]} ${eventDate.eventYear}`;
    }
    return "Nu este specificat";
  }

  if (eventDate.dateMode === "not-sure" || !eventDate.date) {
    return "Nu este specificat";
  }

  const parsedDate = new Date(eventDate.date);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Nu este specificat";
  }

  return parsedDate.toLocaleDateString("ro-RO", {
    day: "numeric",
    month: variant === "short" ? "short" : "long",
    year: "numeric",
  });
}
