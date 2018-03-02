import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './layout.css';

const layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop (je components die hier in komen!)</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;

// hier (in main>props.children) komen je components die je wilt laten zien en wrapped in je layout, dus roep je de children
