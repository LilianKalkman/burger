import React, { Component } from 'react';
import CheckoutSum from '../../components/Order/CheckoutSum/CheckoutSum';

class Checkout extends Component {
  state ={
    ingredients: {
      salad: 2,
      cheese: 0,
      meat: 1,
      bacon: 0
    }
  }
  render(){
    return(
      <div>
        <CheckoutSum ingredients={this.state.ingredients}/>
      </div>
    );
  }
}

export default Checkout;
