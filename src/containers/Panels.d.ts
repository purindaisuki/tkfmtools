import React from "react";

export interface PanelsProps {
  panelsWidth: [string, string];
  horizontal?: boolean;
}

declare const Panels: React.FC<PanelsProps>;

export default Panels;
