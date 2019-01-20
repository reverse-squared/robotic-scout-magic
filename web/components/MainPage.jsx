import React, { Component } from 'react';
import { Button, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Link } from '@reach/router';
import { hot } from 'react-hot-loader/root';

import { AnyIconLoader } from  './Loader';

class MainPage extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return <div>
            <h1>Available Forms</h1>
            <List component="nav">
                {
                    this.props.formData.map(item => {
                        if(item.hidden) return;

                        return <ListItem key={item.id} button component={Link} to={'/form/' + item.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AnyIconLoader icon={item.icon || 'Extension'} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name} secondary={item.description || undefined} />
                        </ListItem>;
                    })
                }
            </List>
            <h1>View Data</h1>
            <p>
                Coming Soon
            </p>
            <h1>Export Data</h1>
            <p>
                Coming Soon
            </p>
        </div>;
    }
}
 
export default hot(MainPage);