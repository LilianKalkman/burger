import * as actionTypes from '../actions';

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0
  }
}

const ingredientsReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ADD :
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName] : state.ingredients[action.ingredientName] + 1
      }
    }

    case actionTypes.REMOVE :
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredientName] : state.ingredients[action.ingredientName] - 1
      }
    }

    default :
    return state;
  }
}

export default ingredientsReducer;
