import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from '@reach/router';
import { hot } from 'react-hot-loader';

class MainPage extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return <div>
            <h1>Main Page</h1>
            <Button component={Link} to="/form/test">Go to the test form</Button>
        </div>;
    }
}
 
export default hot(module)(MainPage);