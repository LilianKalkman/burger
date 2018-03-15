import * as actionTypes from '../actionTypes';
import axios from '../../axios-orders';

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

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const errorCatch = () => {
  return {
    type: actionTypes.ERROR
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://burger-eaf0f.firebaseio.com/ingredients.json')
    .then(response => {
      dispatch(setIngredients(response.data))
    })
    .catch(error => dispatch(errorCatch()));
  };
};
