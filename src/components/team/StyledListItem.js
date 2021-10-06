import styled from "styled-components";
import { ListItem } from "@material-ui/core";

const StyledListItem = styled(ListItem)`
  && {
    margin-bottom: 0.6rem;
    padding-right: 6.8rem;
    color: ${(props) => props.theme.colors.onSurface};
  }
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.shadow + "2A"},
    ${(props) => props.theme.colors.shadow + "0D"}
  );
`;

export default StyledListItem;
