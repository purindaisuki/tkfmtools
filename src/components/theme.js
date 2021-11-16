import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const fontFamily = `
    '黑體-繁', '微軟正黑體','Helvetica', 'Arial', 'LiHei Pro', 
    '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif
`;

const muiTheme = createTheme({
  typography: { fontFamily },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1rem",
          whiteSpace: "pre",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0)",
          },
        },
      },
    },
  },
});

export const MuiThemeProvider = ({ children }) => (
  <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
);

export const lightTheme = {
  colors: {
    background: "#FAFAFA",
    surface: "#ffffff",
    primary: "#e92390",
    secondary: "#b20063",
    success: "#28a745",
    warn: "#ff9800",
    error: "#dc3545",
    blue: "#1976d2",
    onBackground: "#000000",
    onSurface: "#000000",
    onPrimary: "#ffffff",
    onSecondary: "#ffffff",
    onSuccess: "#ffffff",
    onWarn: "#ffffff",
    onError: "#ffffff",
    onBlue: "#ffffff",
    slider: "#ffffff",
    border: "#b20063",
    secondaryBorder: "#b20063",
    shadow: "#757575",
    link: "#007bff",
    linkHover: "#0056b3",
    dropdownHover: "#bdbdbd",
    rank: { high: "#1976d2", low: "#d32f2f" },
  },
  chart: {
    textColor: "#333",
    tooltip: {
      container: {
        background: "#FAFAFA",
      },
    },
    grid: {
      line: {
        stroke: "#bdbdbd",
        strokeWidth: 1,
      },
    },
    colors: ["#ef5350", "#42a5f5", "#66bb6a", "#ffb300", "#ab47bc"],
    treeMapText: "darker",
  },
};

export const darkTheme = {
  colors: {
    background: "#424242",
    surface: "#424242",
    primary: "#212121",
    secondary: "#F48FB1",
    success: "#4caf50",
    warn: "#ff9800",
    error: "#dc3545",
    blue: "#1976d2",
    onBackground: "#ffffff",
    onSurface: "#ffffff",
    onPrimary: "#ffffff",
    onSecondary: "#000000",
    onSuccess: "#ffffff",
    onWarn: "#ffffff",
    onError: "#ffffff",
    onBlue: "#ffffff",
    slider: "#01579B",
    border: "#F48FB1",
    secondaryBorder: "#424242",
    shadow: "#bdbdbd",
    link: "#b3e5fc",
    linkHover: "#e1f5fe",
    dropdownHover: "#757575",
    rank: { high: "#90caf9", low: "#ef9a9a" },
  },
  chart: {
    textColor: "#ffffff",
    tooltip: {
      container: {
        background: "#484848",
      },
    },
    grid: {
      line: {
        stroke: "#757575",
        strokeWidth: 1,
      },
    },
    colors: ["#ef9a9a", "#90caf9", "#a5d6a7", "#ffe082", "#ce93d8"],
    treeMapText: "brighter",
  },
};
