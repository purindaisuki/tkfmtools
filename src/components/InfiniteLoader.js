import React, { useEffect, useReducer, useRef } from "react";
import styled from "styled-components";
import { CircularProgress, List } from "@material-ui/core";

const initState = {
  items: [],
  isFetching: false,
  loadMore: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PUSH":
      return { ...state, items: state.items.concat(action.items) };
    case "UNSHIFT":
      return { ...state, items: action.items.concat(state.items) };
    case "RESET":
      return initState;
    case "FETCH":
      return { ...state, isFetching: action.isFetching };
    case "LOAD_MORE":
      return { ...state, loadMore: action.loadMore };
    default:
      throw new Error();
  }
};

const InfiniteLoader = ({
  listenToUpdate,
  fetchItem,
  renderItem,
  shouldReset,
  onReset,
}) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const bottomBoundaryRef = useRef();

  useEffect(() => {
    if (!bottomBoundaryRef.current) {
      return;
    }

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          dispatch({ type: "LOAD_MORE", loadMore: true });
        }
      });
    }).observe(bottomBoundaryRef.current);

    if (scrollObserver) {
      return () => scrollObserver.unobeserve(bottomBoundaryRef.current);
    }
  }, [bottomBoundaryRef]);

  useEffect(() => {
    if (!state.loadMore) {
      return;
    }

    // flag for preventing from setting state for unmounted components
    let didCancel = false;

    const fetch = async () => {
      dispatch({ type: "FETCH", isFetching: true });
      try {
        const items = await fetchItem();

        if (!items) {
          // fetchItem is not ready
          return;
        }

        if (!didCancel) {
          if (items && items.length !== 0) {
            dispatch({ type: "PUSH", items: items });
          }
          dispatch({ type: "FETCH", isFetching: false });
          dispatch({ type: "LOAD_MORE", loadMore: false });
        }
      } catch (error) {
        if (!didCancel) {
          console.log(error);
          dispatch({ type: "FETCH", isFetching: false });
          dispatch({ type: "LOAD_MORE", loadMore: false });
        }
      }
    };

    fetch();

    return () => {
      didCancel = true;
    };
  }, [fetchItem, state.loadMore]);

  useEffect(() => {
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
