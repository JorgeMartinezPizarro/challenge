import { createTheme, ThemeProvider } from '@mui/material/styles';

const PRIMARY = '#215519'
const PRIMARY_TEXT = "#f9f9f9"
const SECONDARY = '#f9f9f9'
const SECONDARY_TEXT = "#215519"

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
                marginTop: "20px"
              },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    marginTop: "92px", 
                    width: "calc(95% - 53px)",
                    height: "84px"
                },
            },
        },
        MuiModal: {
            styleOverrides: {
              root: {
                textAlign: "center",
                background: '#000000',
                color: "#ffffff",
                overflowY: "scroll",
                width: "100%",
                height: "calc(100% - 92px)",
                marginTop: "92px", 
                opacity: "1",
              },
            },
        },
        MuiButton: {
            styleOverrides: {
              root: {
                height: "28px",
                padding: "4px",
                margin: "4px",
              },
              text: {
                // Common styles for all buttons
                transition: 'all 0.3s ease-in-out',
                primary: PRIMARY_TEXT,
                secondary: SECONDARY_TEXT,
              },
              containedPrimary: {
                "&": {
                    backgroundColor: PRIMARY,
                    color: PRIMARY_TEXT,
                },
                "&:hover": {
                    backgroundColor: SECONDARY,
                    color: SECONDARY_TEXT,
                    boxShadow: 18,
                },
              },
              containedSecondary: {
                "&": {
                    backgroundColor: SECONDARY,
                    color: SECONDARY_TEXT,
                },
                "&:hover": {
                    backgroundColor: PRIMARY,
                    color: PRIMARY_TEXT,
                    boxShadow: 18,
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