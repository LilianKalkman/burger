import React from 'react';
import classes from './BurgerControls.css';
import BurgerControl from './BurgerControl/BurgerControl';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
  { label: 'Bacon', type: 'bacon'}
]

const burgerControls = (props) => {
  return (
    <div className={classes.BurgerControls}>
      {controls.map(control => {
        return <BurgerControl
                  key={control.label}
                  label={control.label}
                  add={() => props.addIngredient(control.type)}
                  remove={() => props.removeIngredient(control.type)}/>
      })}
    </div>
  );
}

export default burgerControls;
