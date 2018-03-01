import React, { Component } from 'react';
import Layout from './components/Layout/layout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <p>component 1</p>
          <p>component 2</p>
        </Layout>
      </div>
    );
  }
}

export default App;
