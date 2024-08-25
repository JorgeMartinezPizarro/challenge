import { createTheme, ThemeProvider } from '@mui/material/styles';

export const PRIMARY = '#215519'
export const SECONDARY = '#312121'
export const PRIMARY_TEXT = "#212121"
export const SECONDARY_TEXT = "#131313"


const theme = createTheme({
    palette: {
        text: {
            primary: PRIMARY_TEXT,
            secondary: SECONDARY_TEXT,
        },
        primary: {
            main: PRIMARY,
            light: PRIMARY,
            dark: PRIMARY,
            contrastText: PRIMARY_TEXT
        },
        secondary: {
            main: SECONDARY,
            light: SECONDARY,
            dark: SECONDARY,
            contrastText: PRIMARY_TEXT
        },
    },
  });

export default theme;  