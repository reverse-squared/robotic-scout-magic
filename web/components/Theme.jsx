import React from 'react';
import { hot } from 'react-hot-loader/root';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {  
        primary: { main: '#3f51b5' }, // Nice blue color. It is the same color as TBA uses. https://www.thebluealliance.com/.
        secondary: { main: '#4caf50' }, // This is just Green.A700 as hex.
    },
    typography: { useNextVariants: true },
});

function Theme(props) {
    return (
        <MuiThemeProvider theme={theme}>
            {props.children}
        </MuiThemeProvider>
    );
}

export default hot(Theme);
