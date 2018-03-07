import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSum from '../../components/Burger/Ordersum/Ordersum';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  constructor(props){
    super(props);

    this.state = {
      ingredients: {
        salad: 3,
        bacon: 0,
        cheese: 0,
        meat: 1
      },
      totalPrice: 4,
      purchasable: false,
      showModal: false,
      loading: false
    }
  }

  updatePurchaseState (ingredients) {
    // const ingredients = {...this.state.ingredients};
    const arr = Object.keys(ingredients).map(ing => {
      return ingredients[ing];
    });
    const totalCount = arr.reduce((total, el) => {
      return total + el;
    }, 0);
    this.setState({ purchasable: totalCount > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = newCount;

    const extraPrice = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + extraPrice;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCountR = this.state.ingredients[type];
    const newCountR = oldCountR - 1 || 0;
    if(newCountR < 0){
      return;
    }
    const newingredients = {...this.state.ingredients};
    newingredients[type] = newCountR;

    const extraPriceR = INGREDIENT_PRICES[type];
    const oldPriceR = this.state.totalPrice;
    const newPriceR = oldPriceR - extraPriceR;

    this.setState({ ingredients: newingredients, totalPrice: newPriceR});
    this.updatePurchaseState(newingredients);
  }

  showModalHandler = () => {
    this.setState({showModal: true});
  }

  removeModalHandler = () => {
    this.setState({showModal: false});
  }

  orderContinueHandler = () => {
    this.setState({loading: true});
    const data = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Lilian',
        email: 'lilian@hotmail.com',
        address: 'bali 3'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('orders', data)
    .then(response => this.setState({loading: false, showModal: false}))
    .catch(error => this.setState({loading: false, showModal: false}));
    // alert('Continued!');
  }

  render(){
    const disabledInfo = {...this.state.ingredients};
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    };

    let orderSummary = null;
    if(this.state.showModal === true){
      orderSummary = <Modal remove={this.removeModalHandler}><OrderSum
        ingredients={this.state.ingredients}
        remove={this.removeModalHandler}
        continue={this.orderContinueHandler}
        price={this.state.totalPrice}/></Modal>
    };
    if(this.state.loading){
      orderSummary = <Modal remove={this.removeModalHandler}><Spinner /></Modal>
    }

    return(
      <Aux>
          {orderSummary}
        <Burger ingredients={this.state.ingredients}/>
        <BurgerControls
          controls={this.state.controls}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          showmodal={this.showModalHandler}
          removeModal={this.removeModalHandler}
          />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
