import React, { Component } from 'react';
import CheckoutSum from '../../components/Order/CheckoutSum/CheckoutSum';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
  // state ={
  //   ingredients: null,
  //   totalPrice: null
  // }
  //
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   // hier maak je er weer een object van
  //   const ingredients = {};
  //   let price = null;
  //
  //   for(let param of query.entries()){
  //     // one entry is [salad, 1]
  //     if(param[0] === 'price'){
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //     // plus ervoor maakt een nummer van een string
  //   }
  //   this.setState({ingredients: ingredients, totalPrice: price});
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render(){
    let summary = <Redirect to="/"/>;
    if(this.props.ingredients){
      summary = (
        <div>
          <CheckoutSum
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
          <Route
            path={this.props.match.url + '/contact-data'}
            component={ContactData}/>
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingr.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout);
