import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    white: '#FFFFFF',
    scrollWhite: '#F5F5F5',
    gray: '#d1d7d9',
    darkGray: '#747474',
    darkestGray: 'rgba(153, 153, 153, 0.15)',
    darkestWhite: 'rgba(0, 0, 0, 0.04)',
    lightGray: 'rgba(0, 0, 0, 0.38)',
    lightBlack: 'rgba(0, 0, 0, 0.87)',
    orange: '#ef8458',
  },
  spacing: {
    unit: 8,
  },
  typography: {
    useNextVariants: true,
  },
});
