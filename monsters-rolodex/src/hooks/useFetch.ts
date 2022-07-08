import { useCallback, useEffect, useReducer, useRef } from "react";

interface State<T> {
  data: T | null;
  error: Error | null;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

interface UseFetchProps {
  url: string;
  options?: RequestInit;
}

export function useFetch<T = unknown>({
  url,
  options,
}: UseFetchProps): State<T> {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: null,
    data: null,
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = useCallback(async () => {
    if (!url) return;

    dispatch({ type: "loading" });

    if (cache.current[url]) {
      dispatch({ type: "fetched", payload: cache.current[url] });
      return;
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = (await response.json()) as T;
      cache.current[url] = data;
      if (cancelRequest.current) return;

      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      if (cancelRequest.current) return;
      dispatch({ type: "error", payload: error as Error });
    }
  }, [url]);

  useEffect(() => {
    cancelRequest.current = false;

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  return state;
}
