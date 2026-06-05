import { useEffect, useState } from "react";
import type { Event } from "../../../types";
import { getEvent } from "../api";
import { isApiClientError } from "../../../lib/api-client";

interface State {
  event: Event | null;
  loading: boolean;
  notFound: boolean;
  error: string | null;
}

export function useEventById(id: string | undefined): State {
  const [state, setState] = useState<State>({
    event: null,
    loading: true,
    notFound: false,
    error: null,
  });

  useEffect(() => {
    if (!id) {
      setState({ event: null, loading: false, notFound: true, error: null });
      return;
    }

    let active = true;
    setState({ event: null, loading: true, notFound: false, error: null });

    getEvent(id)
      .then((event) => {
        if (active) setState({ event, loading: false, notFound: false, error: null });
      })
      .catch((err) => {
        if (!active) return;
        const notFound = isApiClientError(err) && err.status === 404;
        setState({
          event: null,
          loading: false,
          notFound,
          error: notFound ? null : "Couldn't load this retreat.",
        });
      });

    return () => {
      active = false;
    };
  }, [id]);

  return state;
}
