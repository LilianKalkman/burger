import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const modal = (props) => (
  <Aux>
    <Backdrop remove={props.remove}/>
    <div className={classes.Modal}>
      {props.children}
    </div>
  </Aux>
);

export default modal;
