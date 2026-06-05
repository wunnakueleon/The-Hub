export interface CreateBookingInput {
  eventId: string;
  roomId: string;
  guests?: number;
  diet?: string;
  notes?: string;
}

export const DIET_OPTIONS = [
  "None",
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Pescatarian",
  "No shellfish",
  "Other",
] as const;
