import { useCallback, useEffect, useState } from "react";
import type { AdminEventRow } from "../types";
import { listEvents } from "../api";

export function useAdminEvents() {
  const [events, setEvents] = useState<AdminEventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(() => {
    return listEvents()
      .then((e) => {
        setEvents(e);
        setError(null);
      })
      .catch(() => setError("Couldn't load events."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let active = true;
    listEvents()
      .then((e) => active && setEvents(e))
      .catch(() => active && setError("Couldn't load events."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { events, loading, error, refetch };
}
