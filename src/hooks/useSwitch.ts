import { useEffect, useState } from "react";
import useLocalStorage from "hooks/useLocalStorage";

function useSwitch<T>(
  localStorageKey: string,
  layouts: T[],
  initLayoutIndex: number,
  unmountOnLeave?: boolean
): {
  layout: T | null | undefined;
  canRender: boolean[];
  setLayout: (layout: T) => 0 | 1;
} {
  const [localLayout, setLocalLayout] = useLocalStorage<T>(localStorageKey);

  const [state, setState] = useState({
    canRender: Array(layouts.length).fill(false),
  });

  useEffect(() => {
    if (localLayout === undefined) {
      return;
    }

    if (localLayout === null) {
      setLocalLayout(layouts[initLayoutIndex]);
      return;
    }

    setState((state) => ({
      ...state,
      canRender: state.canRender.map(
        (b, i) => (b && !unmountOnLeave) || layouts[i] === localLayout
      ),
    }));
  }, [localLayout]);

  const setLayout = (layout: T) => setLocalLayout(layout);

  return {
    layout: localLayout,
    canRender: state.canRender,
    setLayout: setLayout,
  };
}

export default useSwitch;
