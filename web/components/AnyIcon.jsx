// Note: for now i'm disabling the icon rendering in development mode
// since it makes webpack take so much longer... but they do work
import React from 'react';

let Icons;
if($production) Icons = require('@material-ui/icons');

export default (props) => {
    if($production) {
        const { icon }  = props;
        const Icon = Icons[icon];
        return <Icon />; 
    } else {
        return <div></div>;
    }
};
