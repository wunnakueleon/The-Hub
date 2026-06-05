import { useCallback, useEffect, useState } from "react";
import type { RegistrationRow, RegistrationStatus } from "../types";
import { getRegistrations, setRegistrationStatus } from "../api";

export function useRegistrations(eventId: string | undefined) {
  const [registrations, setRegistrations] = useState<RegistrationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;
    let active = true;
    setLoading(true);
    getRegistrations(eventId)
      .then((r) => active && (setRegistrations(r), setError(null)))
      .catch(() => active && setError("Couldn't load registrations."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [eventId]);

  const setStatus = useCallback(async (id: string, status: RegistrationStatus) => {
    const updated = await setRegistrationStatus(id, status);
    setRegistrations((rs) => rs.map((r) => (r.id === id ? updated : r)));
  }, []);

  return { registrations, loading, error, setStatus };
}
