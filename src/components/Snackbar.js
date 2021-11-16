import React from "react";
import styled from "styled-components";
import { Snackbar as MuiSnackbar } from "@mui/material";
import { AlertIcon, ErrorIcon, SuccessIcon } from "components/icon";

const Snackbar = ({ open, onClose, message, type }) => {
  const icons = {
    success: SuccessIcon,
    warn: AlertIcon,
    error: ErrorIcon,
  };

  return (
    <StyledSnackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      message={message}
      action={icons[type]}
      $type={type}
    />
  );
};

const StyledSnackbar = styled(MuiSnackbar)`
  > div {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    background-color: ${({ theme, $type }) =>
      $type === "warn"
        ? theme.colors.warn
        : $type === "success"
        ? theme.colors.success
        : theme.colors.error};
    font-size: medium;
  }
  .MuiSnackbarContent-action {
    margin: 0;
    padding: 0;
  }
  svg {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 0.4rem;
    fill: ${({ theme, $type }) =>
      $type === "warn"
        ? theme.colors.onWarn
        : $type === "success"
        ? theme.colors.onSuccess
        : theme.colors.onError};
  }
`;

export default Snackbar;
