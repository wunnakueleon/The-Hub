import { useEffect, useState } from "react";
import type { EventSummary } from "../../../types";
import { listEvents } from "../api";

interface State {
  events: EventSummary[];
  loading: boolean;
  error: string | null;
}

export function useEvents(): State {
  const [state, setState] = useState<State>({ events: [], loading: true, error: null });

  useEffect(() => {
    let active = true;
    listEvents()
      .then((events) => {
        if (active) setState({ events, loading: false, error: null });
      })
      .catch(() => {
        if (active) setState({ events: [], loading: false, error: "Couldn't load retreats." });
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}
