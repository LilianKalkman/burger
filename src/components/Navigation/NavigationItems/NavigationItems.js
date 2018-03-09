import React from 'react';
import classes from './NavigationItems.css';
import { NavLink } from 'react-router-dom';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <li className={classes.NavigationItem}>
      <NavLink to="/">Burger Builder</NavLink>
      <NavLink to="/checkout">Checkout</NavLink>
    </li>
  </ul>
);

export default navigationItems;
