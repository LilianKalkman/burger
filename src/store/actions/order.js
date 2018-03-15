import * as actionTypes from '../actionTypes';
import axios from '../../axios-orders';

export const orderSuccess = (id, orderData) => {
  return {
    type: actionTypes.ORDER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const orderFail = (error) => {
  return {
    type: actionTypes.ORDER_FAIL,
    error: error
  };
};

export const orderStartLoading = () => {
  return {
    type: actionTypes.ORDER_START
  };
} ;

export const startOrder = (orderData) => {
  return dispatch => {
    dispatch(orderStartLoading());
    axios.post('orders.json', orderData)
    .then(response => {
      dispatch(orderSuccess(response.data, orderData))
    })
    .catch(error => dispatch(orderFail(error)));
  }
}

// dit zijn je action creators; hier link je direct naar een action om die uit te voeren (in je reducer),
// OF voeg je eerst wat toe voor je de action naar je reducers stuurt. dit doe je met redux thunk en de
// dispatch function. hier 'stuur' je een 'opdracht' die wordt uitgevoerd voor een bepaalde actie.
