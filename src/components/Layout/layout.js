import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
  <Aux>
    <Toolbar />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;

// hier (in main>props.children) komen je components die je wilt laten zien en wrapped in je layout, dus roep je de children
