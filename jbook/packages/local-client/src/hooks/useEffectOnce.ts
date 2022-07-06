import { EffectCallback, useEffect, useRef } from "react";

export const useEffectOnce = (effect: EffectCallback) => {
  const initializeRef = useRef<boolean>(false);
  useEffect(() => {
    if (initializeRef.current) {
      effect();
    } else {
      initializeRef.current = true;
    }
  }, []);
};
