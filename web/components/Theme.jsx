import React from 'react';
import { hot } from 'react-hot-loader/root';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {  
        primary: { main: '#b71c1c' }, // red darken-4
        secondary: { main: '#e53935' }, // red darken-1
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
