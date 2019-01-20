import React from 'react';

import('@fortawesome/fontawesome-free/css/all.css');

export default (props) => {
    return <span className={'fas fa-' + props.icon}></span>;
};
