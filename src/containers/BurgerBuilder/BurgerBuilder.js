import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSum from '../../components/Burger/Ordersum/Ordersum';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actionTypes';

class BurgerBuilder extends Component {
  constructor(props){
    super(props);

    this.state = {
      showModal: false,
      loading: false,
      error: null
    }
  }

  // componentDidMount(){
  //   axios.get('https://burger-eaf0f.firebaseio.com/ingredients.json')
  //   .then(response => {
  //     this.setState({ingredients: response.data});
  //   })
  //   .catch(error => this.setState({error: true}));
  // }

  updatePurchaseState (ingredients) {
    // const ingredients = {...this.state.ingredients};
    const arr = Object.keys(ingredients).map(ing => {
      return ingredients[ing];
    });
    const totalCount = arr.reduce((total, el) => {
      return total + el;
    }, 0);
    return totalCount > 0
  }
  //
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const newCount = oldCount + 1;
  //   const updatedIngredients = {...this.state.ingredients};
  //   updatedIngredients[type] = newCount;
  //
  //   const extraPrice = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + extraPrice;
  //
  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice});
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCountR = this.state.ingredients[type];
  //   const newCountR = oldCountR - 1 || 0;
  //   if(newCountR < 0){
  //     return;
  //   }
  //   const newingredients = {...this.state.ingredients};
  //   newingredients[type] = newCountR;
  //
  //   const extraPriceR = INGREDIENT_PRICES[type];
  //   const oldPriceR = this.state.totalPrice;
  //   const newPriceR = oldPriceR - extraPriceR;
  //
  //   this.setState({ ingredients: newingredients, totalPrice: newPriceR});
  //   this.updatePurchaseState(newingredients);
  // }

  showModalHandler = () => {
    this.setState({showModal: true});
  }

  removeModalHandler = () => {
    this.setState({showModal: false});
  }

  orderContinueHandler = () => {
    this.props.history.push('/checkout');
    // const queryParams = [];
    // for(let i in this.state.ingredients){
    //   queryParams.push(encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString
    // });
  }

  render(){
    const disabledInfo = {...this.props.ingredients};
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    };

    let orderSummary = null;
    if(this.state.showModal === true){
      orderSummary = <Modal remove={this.removeModalHandler}><OrderSum
        ingredients={this.props.ingredients}
        remove={this.removeModalHandler}
        continue={this.orderContinueHandler}
        price={this.props.price}/></Modal>
    };
    if(this.state.loading){
      orderSummary = <Modal remove={this.removeModalHandler}><Spinner /></Modal>
    }

    let burger = (
      <Aux>
        <Spinner />
        <p>{this.state.error ? 'ingredients can\'t be loaded' : null}</p>
      </Aux>
    );

    if(this.props.ingredients !== null){
    burger = (
      <Aux>
        <Burger ingredients={this.props.ingredients}/>
        <BurgerControls
          controls={this.state.controls}
          addIngredient={this.props.add}
          removeIngredient={this.props.remove}
          disabled={disabledInfo}
          price={this.props.price}
          purchasable={this.updatePurchaseState(this.props.ingredients)}
          showmodal={this.showModalHandler}
          removeModal={this.removeModalHandler}
          />
      </Aux>
    )};

    return(
      <Aux>
          {orderSummary}
          {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingr.ingredients,
    price: state.ingr.totalPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (name) => dispatch({type: actionTypes.ADD, ingredientName: name }),
    remove: (name) => dispatch({type: actionTypes.REMOVE, ingredientName: name }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
