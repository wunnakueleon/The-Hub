import { useEffect, useState } from "react";
import type { AdminUserRow } from "../types";
import { listUsers } from "../api";

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    listUsers()
      .then((u) => active && (setUsers(u), setLoading(false)))
      .catch(() => active && (setError("Couldn't load users."), setLoading(false)));
    return () => {
      active = false;
    };
  }, []);

  return { users, loading, error };
}
