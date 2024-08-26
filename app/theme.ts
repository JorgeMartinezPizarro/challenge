import { createTheme, ThemeProvider } from '@mui/material/styles';

const PRIMARY = '#215519'
const PRIMARY_TEXT = "#f9f9f9"
const PRIMARY_HOVER = "#158117"
const SECONDARY = '#990000'
const SECONDARY_TEXT = "#e5e5e5"
const SECONDARY_HOVER = "#590000"

const theme = createTheme({
    components: {
        MuiTable: {
            styleOverrides: {
              root: {
                background: PRIMARY,
                color: PRIMARY_TEXT,
              },
              stickyHeader: true,
              
            },
        },
        MuiTableContainer: {
            styleOverrides: {
              root: {
                overflow: "scroll",
                width: "calc(100% - 32px)",
                height: "calc(100% - 230px)",
                marginTop: "40px"
              },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    marginTop: "70px", 
                    width: "calc(95% - 53px)",
                    height: "84px",
                    overflow: 'hidden',
                    textOverflow: "ellipsis"
                },
            },
        },
        MuiModal: {
            styleOverrides: {
              root: {
                textAlign: "center",
                background: PRIMARY,
                color: SECONDARY_TEXT,
                overflowY: "scroll",
                width: "100%",
                height: "calc(100% - 92px)",
                paddingTop: "92px", 
                opacity: "1",
                zIndex: 100,
              },
            },
        },
        MuiButton: {
            styleOverrides: {
              root: {
                padding: "4px",
                margin: "4px",
              },
              text: {
                primary: PRIMARY_TEXT,
                secondary: SECONDARY_TEXT,
              },
              containedPrimary: {
                "&": {
                    backgroundColor: PRIMARY,
                    color: PRIMARY_TEXT,
                },
                "&:hover": {
                    backgroundColor: PRIMARY_HOVER,
                },
              },
              containedSecondary: {
                "&": {
                    backgroundColor: SECONDARY,
                    color: SECONDARY_TEXT,
                },
                "&:hover": {
                    backgroundColor: SECONDARY_HOVER,
                },
                
              },
            },
        },
    },
    palette: {
        text: {
            primary: PRIMARY_TEXT,
            secondary: SECONDARY_TEXT,
        },
        primary: {
            main: PRIMARY,
            light: PRIMARY_TEXT,
            dark: PRIMARY_TEXT,
            contrastText: PRIMARY_TEXT
        },
        secondary: {
            main: SECONDARY,
            light: SECONDARY_TEXT,
            dark: SECONDARY_TEXT,
            contrastText: SECONDARY_TEXT
        },
    },
  });

export default theme;  