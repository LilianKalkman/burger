import * as actionTypes from '../actionTypes';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD,
    ingredientName: name
  };
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE,
    ingredientName: name
  };
}