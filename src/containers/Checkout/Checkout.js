import React, { Component } from 'react';
import CheckoutSum from '../../components/Order/CheckoutSum/CheckoutSum';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state ={
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    // hier maak je er weer een object van
    const ingredients = {};
    for(let param of query.entries()){
      // one entry is [salad, 1]
      ingredients[param[0]] = +param[1];
      // plus ervoor maakt een nummer van een string
    }
    this.setState({ingredients: ingredients});
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render(){
    return(
      <div>
        <CheckoutSum
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
        <Route path={this.props.match.url + '/contact-data'} component={ContactData}/>
      </div>
    );
  }
}

export default Checkout;
