import { useState, useEffect } from "react";

export function useDebouncedValue<T>(
  initialValue: T,
  time?: number
): [T, T, React.Dispatch<T>] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const debounce = setTimeout(() => setDebouncedValue(value), time || 100);
    return () => clearTimeout(debounce);
  }, [value, time]);

  return [debouncedValue, value, setValue];
}

let count = 1;
export const useDebounceCallback = <T = unknown>(fn: () => T, ms?: number) => {
  console.log("count", count++);

  let timer = 0;

  const debouncedFunc = () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => fn(), ms || 1000);
  };

  useEffect(() => () => clearTimeout(timer), [timer]);

  return debouncedFunc;
};
