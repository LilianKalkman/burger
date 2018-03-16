import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/actions_index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount(){
    this.props.get();
    // axios.get('/orders.json')
    // .then(response => {
    //   const fetchedOrders = [];
    //   for(let key in response.data){
    //     fetchedOrders.push({
    //       ...response.data[key],
    //       id: key
    //     });
    //   }
    //   this.setState({orders: fetchedOrders, loading: false});
    // })
    // .catch(err => {
    //   this.setState({loading: false});
    // });
  }

  render(){
    let order = <Spinner />;
    if(!this.props.loading){
      order = (
        <div>
          { this.props.orders.map(order => {
            return (
              <Order
                key={order.id}
                price={+order.price}
                ingredients={order.ingredients}/>
            );
          })}
        </div>
      );
    }
    return order;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.odr.orders,
    loading: state.odr.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    get: () => dispatch(actions.getOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
