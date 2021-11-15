import React from "react";
import styled from "styled-components";
import { Fab, useScrollTrigger, Zoom } from "@material-ui/core";
import { ToTopIcon } from "components/icon";

const ScrollTop = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <Wrapper onClick={handleClick} role="presentation">
        {children}
      </Wrapper>
    </Zoom>
  );
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 3;
  bottom: 2rem;
  right: 2rem;
`;

const BackToTop = () => (
  <ScrollTop>
    <StyledFab size="small" aria-label="scroll back to top">
      {ToTopIcon}
    </StyledFab>
  </ScrollTop>
);

const StyledFab = styled(Fab)`
  &&& {
    background-color: ${(props) => props.theme.colors.secondary};
    svg {
      width: 2.5rem;
      height: 2.5rem;
      fill: ${(props) => props.theme.colors.onSecondary};
    }
    &:hover {
      box-shadow: inset 0 0 10rem rgba(0, 0, 0, 0.05);
    }
  }
`;

export default BackToTop;
