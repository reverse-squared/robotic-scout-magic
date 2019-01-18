import React from 'react';
import { hot } from 'react-hot-loader/root';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, lightBlue } from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
    palette: {  
        primary: { main: '#3f51b5' }, // Purple and green play nicely together.
        secondary: { main: '#4caf50' }, // This is just green.A700 as hex.
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
