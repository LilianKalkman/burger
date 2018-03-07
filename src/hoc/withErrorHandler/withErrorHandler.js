import React, { Component } from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount(){
      this.reqIntercep = axios.interceptors.request.use( request => {
      this.setState({error: null});
      return request;});
      this.resIntercep = axios.interceptors.response.use(response => response, error => {
        this.setState({error: error});
      });
    }

    componentWillUnmount(){
      axios.interceptors.request.eject(this.reqIntercep);
      axios.interceptors.response.eject(this.resIntercep);
    }

    removeErrorHandler = () => {
      this.setState({error: null});
    }

    render(){
      let modal = null
      if(this.state.error){
        modal = <Modal
          remove={this.removeErrorHandler}>{this.state.error ? this.state.error.message : null}</Modal>
      }
      return(
        <Aux>
          {modal}
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;
