import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className="NavigationItems">
        {!props.isAuthenticated
            ? <NavigationItem link="/auth">Login</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>}
            <NavigationItem link="/" exact>Calendar</NavigationItem>
            <NavigationItem link="/stopwatch" exact>Stopwatch</NavigationItem>
            <NavigationItem link="/countdown" exact>Countdown</NavigationItem>
    </ul>
);

export default navigationItems;