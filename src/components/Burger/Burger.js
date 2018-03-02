import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.css';

const burger = (props) => {
  const transformedIngredients = Object.keys(props.ingredients)
  .map(ingrKey => {
    return [...Array(props.ingredients[ingrKey])].map((_, i) => {
      return <BurgerIngredient key={ingrKey + i} type={ingrKey} />;
    });
  });
  return(
    <div className={classes.Burger}>
      {transformedIngredients}
    </div>
  );
}

export default burger;
