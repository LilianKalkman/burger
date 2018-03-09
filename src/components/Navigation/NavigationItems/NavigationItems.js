import React from 'react';
import classes from './NavigationItems.css';
import { NavLink } from 'react-router-dom';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <li className={classes.NavigationItem}>
      <NavLink
        to="/" exact
        activeClassName={classes.active}>Burger Builder</NavLink>
      <NavLink
        to="/orders" exact
        activeClassName={classes.active}>My Order</NavLink>
    </li>
  </ul>
);

export default navigationItems;
