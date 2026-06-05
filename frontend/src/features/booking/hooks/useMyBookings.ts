import { useCallback, useEffect, useState } from "react";
import type { Booking } from "../../../types";
import { getMyBookings, cancelBooking } from "../api";

interface State {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

export function useMyBookings() {
  const [state, setState] = useState<State>({ bookings: [], loading: true, error: null });

  const refetch = useCallback(() => {
    setState((s) => ({ ...s, loading: true }));
    return getMyBookings()
      .then((bookings) => setState({ bookings, loading: false, error: null }))
      .catch(() => setState({ bookings: [], loading: false, error: "Couldn't load your bookings." }));
  }, []);

  useEffect(() => {
    let active = true;
    getMyBookings()
      .then((bookings) => active && setState({ bookings, loading: false, error: null }))
      .catch(() => active && setState({ bookings: [], loading: false, error: "Couldn't load your bookings." }));
    return () => {
      active = false;
    };
  }, []);

  const cancel = useCallback(
    async (id: string) => {
      await cancelBooking(id);
      await refetch();
    },
    [refetch],
  );

  return { ...state, refetch, cancel };
}
