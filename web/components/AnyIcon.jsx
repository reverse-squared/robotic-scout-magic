import React from 'react';
import Loadable from 'react-loadable';

import * as Icons from '@material-ui/icons';

export default (props) => {
    const { icon }  = props;
    const Icon = Icons[icon];
    return <Icon />; 
};
