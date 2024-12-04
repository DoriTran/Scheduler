import { useMemo, useRef } from "react";

export default function useMemoPrev(callback, dependencies, initialState) {
  const prevValueRef = useRef(initialState);

  const result = useMemo(() => {
    prevValueRef.current = callback(prevValueRef.current);
    return prevValueRef.current;
  }, [...dependencies]);

  return result;
}
