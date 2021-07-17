import React from "react";

export interface HeaderProps {
  title: string;
  titleIcon?: HTMLElement;
  withHelp?: boolean;
  onClickHelp?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  end?: React.ReactNode;
  id?: string;
  border?: boolean;
}

declare const Header: React.FC<HeaderProps>;

export default Header;
