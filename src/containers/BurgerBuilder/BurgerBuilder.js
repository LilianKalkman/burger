import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  constructor(props){
    super(props);

    this.state = {
      ingredients: {
        salad: 3,
        bacon: 0,
        cheese: 0,
        meat: 1
      }
    }
  }
  render(){
    return(
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <div>Component: Builder Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
