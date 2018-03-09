import React, { Component } from 'react';
import classes from './ContactData.css'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postal: ''
    }
  }
  render(){
    return(
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form action="">
          <input type="text" name="name" placeholder="name"/>
          <input type="text" name="email" placeholder="email"/>
          <input type="text" name="street" placeholder="street"/>
          <input type="text" name="postal" placeholder="postal"/>
          <button>Order</button>
        </form>
      </div>
    );
  }
}

export default ContactData;
