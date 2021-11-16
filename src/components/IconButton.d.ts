import React from "react";
import { IconButtonProps as MuiIconButtonProps } from "@mui/material";

export interface IconButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltipText?: string;
  dataHtml2canvasIgnore?: boolean;
  ariaDescribedby?: string;
}

declare const IconButton: React.FC<MuiIconButtonProps & IconButtonProps>;

export default IconButton;
