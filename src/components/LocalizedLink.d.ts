import React from "react";

export interface LocalizedLinkProps {
  to: string;
  disableLocale?: boolean;
  decoration?: boolean;
  replace?: boolean;
  state?: any;
}

declare const LocalizedLink: React.FC<LocalizedLinkProps>;

export default LocalizedLink;
