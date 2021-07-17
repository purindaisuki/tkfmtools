import styled from "styled-components";

const Scrollable = styled.div`
  overflow: auto;
  height: 100%;
  scrollbar-width: thin;
  padding-right: 0.5rem;
  margin-right: -0.5rem;
  &::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
    background: ${(props) => props.theme.colors.surface};
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.border};
    border-radius: 0.25rem;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.surface};
  }
  &::-webkit-scrollbar-corner {
    background: ${(props) => props.theme.colors.surface};
  }
`;

export default Scrollable;
