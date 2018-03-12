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
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 7
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
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

  checkValidation = (value, rules) => {
    let isValid = true;

    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
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
    updatedElement.valid = this.checkValidation(updatedElement.value, updatedElement.validation);
    updatedElement.touched = true;
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
              invalid={!element.config.valid}
              shouldValidate={element.config.validation}
              touched={element.config.touched}
              valueType={element.id}
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
