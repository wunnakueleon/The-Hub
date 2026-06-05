import { useCallback, useState } from "react";
import { isApiClientError } from "../../../lib/api-client";
import { useAuth } from "../../auth/hooks/useAuth";
import { updateProfile } from "../api";
import type { UpdateProfileInput } from "../types";

export function useProfile() {
  const { applyUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(
    async (input: UpdateProfileInput) => {
      setSaving(true);
      setSaved(false);
      setError(null);
      try {
        const user = await updateProfile(input);
        applyUser(user); // propagate to Nav / rest of app
        setSaved(true);
        return user;
      } catch (err) {
        setError(isApiClientError(err) ? err.message : "Couldn't save your changes.");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [applyUser],
  );

  const clearSaved = useCallback(() => setSaved(false), []);

  return { update, saving, saved, error, clearSaved };
}
