import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from '@reach/router';
import { hot } from 'react-hot-loader';

class MainPage extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return <div>
            <h1>Main Page</h1>
            <List component="nav">
                {
                    this.props.formData.map(item => {
                        return <ListItem key={item.id} button component={Link} to={'/form/' + item.id}>
                            <ListItemText primary={item.name} />
                        </ListItem>;
                    })
                }
            </List>
        </div>;
    }
}
 
export default hot(module)(MainPage);