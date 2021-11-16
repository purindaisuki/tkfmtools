import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLayoutConfig } from "containers/Layout";

export const panelsStyle = [
  {
    display: "block",
    width: "100%",
    maxWidth: "1000px",
    margin: "auto",
    divDisplay: "block",
    divWidth: "100%",
    divMargin: "1rem 0",
    divDivMaxHeight: "none",
  },
  {
    display: "table",
    width: "calc(100% + 2rem)",
    maxWidth: "none",
    margin: "-1rem",
    divDisplay: "table-cell",
    divWidth: "60%",
    divMargin: "auto",
    divDivMaxHeight: "none",
    marginBottom: "0",
    borderSpacing: "1rem",
  },
];

const Panels = ({ children, panelsWidth, horizontal }) => {
  const { layout } = useLayoutConfig();

  const [isLandscape, setLandscape] = useState(true);

  useEffect(() => {
    setLandscape(layout === 1);
  }, [layout]);

  return (
    <Container $horizontal={horizontal || isLandscape}>
      {children.map((child, i) => (
        <OutlinedPanel key={i} $width={panelsWidth[i]}>
          {child}
        </OutlinedPanel>
      ))}
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => `
  display: ${theme.panelLayout.display};
  width: ${theme.panelLayout.width};
  max-width: ${theme.panelLayout.maxWidth};
  margin: ${theme.panelLayout.margin};
  margin-bottom: ${theme.panelLayout.marginBottom};
  border-spacing: ${theme.panelLayout.borderSpacing};
  > div {
    display: ${theme.panelLayout.divDisplay};
    margin: ${theme.panelLayout.divMargin};
    ${
      theme.panelLayout.divDivMaxHeight === "var(--divDivMaxHeight)"
        ? `> div {
            max-height: none;
          }`
        : ""
    }
  }`}
  @media screen and (max-width: 1000px) ${({ $horizontal }) =>
    $horizontal ? "" : ",(min-width: 0px)"} {
    display: block;
    width: 100%;
    max-width: 1000px;
    margin: auto;
    > div {
      display: block;
      width: 100%;
      margin: 1rem 0;
      > div {
        max-height: none;
      }
    }
  }
`;
const OutlinedPanel = styled.div`
  display: table-cell;
  width: ${({ theme, $width }) =>
    theme.panelLayout.divWidth === "var(--divWidth)"
      ? theme.panelLayout.divWidth
      : $width};
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 0 0.15em ${({ theme }) => theme.colors.shadow};
`;

export default Panels;
