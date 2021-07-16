import React from "react";

interface IconButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltipText?: string;
  dataHtml2canvasIgnore?: boolean;
  ariaDescribedby?: string;
}

declare const IconButton: React.FC<IconButtonProps>;

export default IconButton;
