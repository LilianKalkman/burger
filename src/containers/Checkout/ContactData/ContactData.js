import React, { Component } from 'react';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postal: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const data = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Lilian',
        email: 'lilian@hotmail.com',
        address: 'bali 3'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('orders.json', data)
    .then(response => {
      this.setState({loading: false});
      this.props.history.push('/');
    })
    .catch(error => this.setState({loading: false}));
  }

  render(){
    let form = (
        <form action="">
          <input type="text" name="name" placeholder="name"/>
          <input type="text" name="email" placeholder="email"/>
          <input type="text" name="street" placeholder="street"/>
          <input type="text" name="postal" placeholder="postal"/>
          <button onClick={this.orderHandler}>Order</button>
        </form>
    );
    if(this.state.loading){
      form = <Spinner />
    }
    return(
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
