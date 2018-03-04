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
      totalPrice: 4
    }
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
  }

  removeIngredientHandler = (type) => {

  }

  render(){
    return(
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BurgerControls
          controls={this.state.controls}
          addIngredient={this.addIngredientHandler}
          />
      </Aux>
    );
  }
}

export default BurgerBuilder;
