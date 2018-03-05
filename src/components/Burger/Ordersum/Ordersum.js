import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSum = (props) => {
  const ingredients = Object.keys(props.ingredients).map( (i, index) => {
    return <li key={index}><span style={{textTransform: 'capitalize'}}>{i}</span>:{props.ingredients[i]}</li>;
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Burger with the following ingredients:</p>
      <ul>
        {ingredients}
      </ul>
      <p>Continue to Checkout?</p>
      <Button
        btnType="Danger"
        clicked={props.remove}>CANCEL</Button>
      <Button
        btnType="Success"
        clicked={props.continue}>CONTINUE</Button>
    </Aux>
  );
}

export default OrderSum;
