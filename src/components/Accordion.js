import React from "react";
import styled from "styled-components";
import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
} from "@mui/material";

const Accordion = ({
  className,
  expanded,
  onChange,
  square,
  expandIcon,
  title,
  content,
}) => {
  return (
    <StyledAccordion
      className={className}
      expanded={expanded}
      onChange={onChange}
      square={square}
      TransitionProps={{ mountOnEnter: true }}
    >
      <MuiAccordionSummary expandIcon={expandIcon}>{title}</MuiAccordionSummary>
      <MuiAccordionDetails>{content}</MuiAccordionDetails>
    </StyledAccordion>
  );
};

const StyledAccordion = styled(MuiAccordion)`
  box-shadow: none;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.onSurface};
  transition: all 0.3s ease;
  &.Mui-expanded {
    margin: 0;
  }
  > .MuiAccordionSummary-root {
    transition: border-bottom 0.3s ease;
    min-height: 0;
  }
  .MuiAccordionSummary-expandIconWrapper {
    padding: 0;
    svg {
      fill: ${({ theme }) => theme.colors.secondary};
      margin: 0;
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;

export default Accordion;
