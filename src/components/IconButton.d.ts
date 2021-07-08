import React from "react";

export interface IconButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    tooltipText?: string;
    dataHtml2canvasIgnore?: boolean,
    ariaDescribedby?: string,
}

declare const IconButton: React.FC<IconButtonProps>;

export default IconButton;
