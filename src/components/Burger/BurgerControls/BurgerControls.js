import React from 'react';
import classes from './BurgerControls.css';
import BurgerControl from './BurgerControl/BurgerControl';

const burgerControls = (props) => {
  return (
    <div className={classes.BurgerControls}>
      <BurgerControl />
    </div>
  );
}

export default burgerControls;
