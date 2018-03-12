import React, { Component } from 'react';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue:'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}]
        },
        value: ''
      },
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for(let element in this.state.orderForm){
      formData[element] = this.state.orderForm[element].value;
    }
    const data = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderdata: formData,
    }

    axios.post('orders.json', data)
    .then(response => {
      this.setState({loading: false});
      this.props.history.push('/');
    })
    .catch(error => this.setState({loading: false}));
  }

  inputChangeHandler = (event, elementId) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedElement = {...updatedOrderForm[elementId]};
    updatedElement.value = event.target.value;
    updatedOrderForm[elementId] = updatedElement;
    this.setState({orderForm: updatedOrderForm});
  }

  render(){
    const formElementsArray = [];
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(element => {
            return <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              changed={(event)=> this.inputChangeHandler(event, element.id)}
              />
          })}
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
