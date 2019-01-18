import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from '@reach/router';
import { hot } from 'react-hot-loader';

import ExtensionIcon from '@material-ui/icons/Extension';

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
                            <ListItemAvatar>
                                <Avatar>
                                    <ExtensionIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name} secondary={item.description || undefined} />
                        </ListItem>;
                    })
                }
            </List>
        </div>;
    }
}
 
export default hot(module)(MainPage);