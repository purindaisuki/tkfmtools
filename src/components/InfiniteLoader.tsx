import React, { useEffect, useReducer, useRef } from "react";
import styled from "styled-components";
import { CircularProgress, List } from "@material-ui/core";

type InfiniteLoaderState<T> = {
  items: T[];
  isFetching: boolean;
  shouldLoad: boolean;
};

type InfiniteLoaderAction<T> =
  | { type: "PUSH" | "UNSHIFT"; items: T[] }
  | { type: "FLAG_FECTHING"; isFetching: boolean }
  | { type: "FLAG_SHOULD_LOAD"; shouldLoad: boolean }
  | { type: "RESET" };

const initState = {
  items: [],
  isFetching: false,
  shouldLoad: true,
} as InfiniteLoaderState<any>;

const reducer = <T,>(
  state: InfiniteLoaderState<T>,
  action: InfiniteLoaderAction<T>
) => {
  switch (action.type) {
    case "PUSH":
      return { ...state, items: state.items.concat(action.items) };
    case "UNSHIFT":
      return { ...state, items: action.items.concat(state.items) };
    case "FLAG_FECTHING":
      return { ...state, isFetching: action.isFetching };
    case "FLAG_SHOULD_LOAD":
      return { ...state, shouldLoad: action.shouldLoad };
    case "RESET":
      return initState;
    default:
      throw new Error("Unexpected action type");
  }
};

type InfiniteLoaderProps<T> = {
  listenToUpdate: (callback: (newItems: T[]) => void) => void | (() => void);
  fetchItem: () => Promise<T[]>;
  renderItem: (i: T) => JSX.Element;
  shouldReset: boolean;
  onReset: () => void;
};

const InfiniteLoader = <T,>({
  listenToUpdate,
  fetchItem,
  renderItem,
  shouldReset,
  onReset,
}: InfiniteLoaderProps<T>) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const bottomBoundaryRef = useRef<HTMLDivElement>(null!);

  // subscribe to scroller and trigger loading when bottom div intersects viewport
  useEffect((): void | (() => void) => {
    if (!bottomBoundaryRef?.current) {
      throw Error("bottomBoundaryRef is not assigned");
    }

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          dispatch({ type: "FLAG_SHOULD_LOAD", shouldLoad: true });
        }
      });
    });

    scrollObserver.observe(bottomBoundaryRef.current);

    return () => scrollObserver.unobserve(bottomBoundaryRef.current);
  }, [bottomBoundaryRef]);

  useEffect(() => {
    if (!state.shouldLoad) {
      return;
    }

    // flag for preventing from setting state for unmounted components
    let didCancel = false;

    const fetch = async () => {
      dispatch({ type: "FLAG_FECTHING", isFetching: true });
      try {
        const items = await fetchItem();

        if (!items) {
          // fetchItem fails
          return;
        }

        if (!didCancel) {
          if (items.length !== 0) {
            dispatch({ type: "PUSH", items: items });
          }
          dispatch({ type: "FLAG_FECTHING", isFetching: false });
          dispatch({ type: "FLAG_SHOULD_LOAD", shouldLoad: false });
        }
      } catch (error) {
        if (!didCancel) {
          console.log(error);
          dispatch({ type: "FLAG_FECTHING", isFetching: false });
          dispatch({ type: "FLAG_SHOULD_LOAD", shouldLoad: false });
        }
      }
    };

    fetch();

    return () => {
      didCancel = true;
    };
  }, [fetchItem, state.shouldLoad]);

  useEffect((): void | (() => void) => {
    const cleanup = listenToUpdate((newItems) => {
      dispatch({ type: "UNSHIFT", items: newItems });
    });

    if (cleanup) {
      return () => cleanup();
    }
  }, [listenToUpdate]);

  useEffect(() => {
    if (!shouldReset) {
      return;
    }

    dispatch({ type: "RESET" });
    onReset();
  }, [shouldReset, onReset]);

  return (
    <>
      <List>
        {state.items.map((i) => renderItem(i))}
        <div ref={bottomBoundaryRef} />
      </List>
      {state.isFetching && (
        <StyledSpinner size={32} thickness={6} disableShrink />
      )}
    </>
  );
};

const StyledSpinner = styled(CircularProgress)`
  && {
    display: block;
    margin: auto;
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export default InfiniteLoader;
