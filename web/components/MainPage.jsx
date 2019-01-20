import React, { Component } from 'react';
import { Button, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Link } from '@reach/router';
import { hot } from 'react-hot-loader/root';

import FontAwesome from './FontAwesome';

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
                        // Hidden forms only show hidden in production mode
                        if(item.hidden && $production) return;

                        let secondaryText;
                        if (!item.hidden && !item.description) {
                            secondaryText = undefined;
                        } else {
                            secondaryText = <span>{item.hidden && <strong>Hidden in Production Mode.{' '}</strong>}{item.description || ''}</span>;
                        }
                        
                        return <ListItem key={item.id} button component={Link} to={'/form/' + item.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FontAwesome icon={item.icon || 'file-alt'} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.name}
                                secondary={secondaryText}
                            />
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