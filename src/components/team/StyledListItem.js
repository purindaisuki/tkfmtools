import styled from "styled-components";
import { ListItem } from "@mui/material";

const StyledListItem = styled(ListItem)`
  margin-bottom: 0.6rem;
  padding-right: 6.8rem;
  color: ${({ theme }) => theme.colors.onSurface};
  background: linear-gradient(
    90deg,
    ${({ theme }) => `${theme.colors.shadow}2A`},
    ${({ theme }) => `${theme.colors.shadow}0D`}
  );
`;

export default StyledListItem;
