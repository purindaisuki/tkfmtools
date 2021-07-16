import { useCallback, useEffect, useState } from "react";

function useLocalStorage<T>(
  key: string
): [T | null | undefined, (value: T) => 0 | 1];
function useLocalStorage<T>(
  key: string,
  initialValue: T extends null | undefined ? never : T
): [T, (value: T) => 0 | 1];
function useLocalStorage<T>(
  key: string,
  initialValue?: T extends null | undefined ? never : T
): [T | null | undefined, (value: T) => 0 | 1] {
  const [localValue, setLocalValue] = useState<T | null | undefined>(
    initialValue
  );

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);

      if (item === null) {
        if (initialValue === undefined) {
          setLocalValue(null);
        }
        return;
      }

      try {
        setLocalValue(JSON.parse(item));
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setValue = useCallback(
    (value: T) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(localValue) : value;
        setLocalValue(valueToStore);

        if (typeof window !== "undefined") {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        }

        return 1;
      } catch (error) {
        console.log(error);

        return 0;
      }
    },
    [localValue]
  );

  return [localValue, setValue];
}

export default useLocalStorage;
