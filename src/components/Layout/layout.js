import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  constructor(props){
    super(props);

    this.state = {
      showSideDrawer: true
    }
  }

  removeSideDrawerHandler = () => {
    this.setState({showSideDrawer: false});
  }

  render(){
    let sideDrawer = null;
    if(this.state.showSideDrawer){
      sideDrawer =  <SideDrawer
          close={this.removeSideDrawerHandler}
          open={this.state.showSideDrawer}/>
    }

    return(
      <Aux>
        <Toolbar />
        {sideDrawer}
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;

// hier (in main>props.children) komen je components die je wilt laten zien en wrapped in je layout, dus roep je de children
