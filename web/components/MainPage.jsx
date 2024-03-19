import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Link } from '@reach/router';
import { hot } from 'react-hot-loader/root';

import FontAwesome from './FontAwesome';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.handleGoToForm = (formID) => () => {
            this.props.navigate('/form/' + formID);
        };
    }
    render() { 
        return <div>
            <h1>Available Forms</h1>
            <List>
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
                        
                        return <ListItem key={item.id} button onClick={this.handleGoToForm(item.id)}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FontAwesome icon={item.icon || 'file-alt'} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.name}
                                secondary={secondaryText}
                            />
                            {/*
                            <ListItemSecondaryAction>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    to={'/view/' + item.id}
                                >View Data</Button>
                            </ListItemSecondaryAction>
                            */}
                        </ListItem>;
                    })
                }
                {
                    this.props.formData.length === 0 && <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <FontAwesome icon={'exclamation'} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={'No Forms found in the /forms folder!'}
                        />
                    </ListItem>
                }
            </List>
            
            <p>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={'/export'}
                >Export Data</Button>
            </p>
        </div>;
    }
}
 
export default hot(MainPage);