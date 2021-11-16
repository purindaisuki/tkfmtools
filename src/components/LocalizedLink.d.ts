import React from "react";
import { LinkProps } from "@mui/material";

export interface LocalizedLinkProps {
  to: string;
  disableLocale?: boolean;
  decoration?: boolean;
  replace?: boolean;
  state?: any;
}

declare const LocalizedLink: React.FC<LinkProps & LocalizedLinkProps>;

export default LocalizedLink;
