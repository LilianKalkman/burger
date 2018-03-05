import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';

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
      purchasable: false
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

  render(){
    const disabledInfo = {...this.state.ingredients};
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return(
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BurgerControls
          controls={this.state.controls}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          />
      </Aux>
    );
  }
}

export default BurgerBuilder;
