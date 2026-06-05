import { useEffect, useState } from "react";
import type { AdminStats } from "../types";
import { getStats } from "../api";

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getStats()
      .then((s) => active && (setStats(s), setLoading(false)))
      .catch(() => active && (setError("Couldn't load the dashboard."), setLoading(false)));
    return () => {
      active = false;
    };
  }, []);

  return { stats, loading, error };
}
