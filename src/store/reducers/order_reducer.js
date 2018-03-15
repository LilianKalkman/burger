import * as actionTypes from '../actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const orderReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.ORDER_INIT :
    return{
      ...state,
      purchased: false
    };

    case actionTypes.ORDER_START :
    return {
      ...state,
      loading: true
    };

    case actionTypes.ORDER_SUCCESS :
    const newOrder = {
      ...action.orderData,
      id: action.orderId
    };
    return {
      ...state,
      loading: false,
      purchased: true,
      orders: state.orders.concat(newOrder)
    };

    case actionTypes.ORDER_FAIL :
    return {
      ...state,
      loading: false
    };

    default :
    return state;
  }
}

export default orderReducer;
