import React from 'react';
import classes from './NavigationItems.css';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <li className={classes.NavigationItem}>
      <a href="/" active className={classes.active}>Burger Builder</a>
      <a href="/">Checkout</a>
    </li>
  </ul>
);

export default navigationItems;
