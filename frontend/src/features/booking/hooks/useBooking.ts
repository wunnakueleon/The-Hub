import { useCallback, useState } from "react";
import type { Booking } from "../../../types";
import { isApiClientError } from "../../../lib/api-client";
import { createBooking } from "../api";
import type { CreateBookingInput } from "../types";

export function useBooking() {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Booking | null>(null);

  const create = useCallback(async (input: CreateBookingInput) => {
    setCreating(true);
    setError(null);
    try {
      const booking = await createBooking(input);
      setResult(booking);
      return booking;
    } catch (err) {
      setError(isApiClientError(err) ? err.message : "Couldn't complete your booking. Please try again.");
      throw err;
    } finally {
      setCreating(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { create, creating, error, result, reset };
}
