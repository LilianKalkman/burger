import * as actionTypes from '../actionTypes';
import axios from '../../axios-orders';

export const orderInit = () => {
  return {
    type: actionTypes.ORDER_INIT
  }
}

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
      dispatch(orderSuccess(response.data.name, orderData))
    })
    .catch(error => dispatch(orderFail(error)));
  }
}

// FETCHING ORDERS

export const getOrdersSuccess = (orders) => {
  return {
    type: actionTypes.GET_ORDERS_SUCCES,
    orders: orders
  };
};

export const getOrdersFail = (error) => {
  return{
    type: actionTypes.GET_ORDERS_FAIL,
    error: error
  }
}

export const startGetOrders = () => {
  return {
    type: actionTypes.START_GET_ORDERS
  };
};

export const getOrders = (orders) => {
  return dispatch => {
    dispatch(startGetOrders());
    axios.get('/orders.json')
    .then(response => {
      const fetchedOrders = [];
      for(let key in response.data){
        fetchedOrders.push({
          ...response.data[key],
          id: key
        });
      }
      dispatch(getOrdersSuccess(fetchedOrders));
    })
    .catch(err => {
      dispatch(getOrdersFail(err));
    });
  }
}

// dit zijn je action creators; hier link je direct naar een action om die uit te voeren (in je reducer),
// OF voeg je eerst wat toe voor je de action naar je reducers stuurt. dit doe je met redux thunk en de
// dispatch function. hier 'stuur' je een 'opdracht' die wordt uitgevoerd voor een bepaalde actie.
