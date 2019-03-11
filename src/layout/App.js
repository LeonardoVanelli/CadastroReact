import React, { Component } from 'react';
import '../css/bootstrap.css';
import '../css/bootstrap-theme.css';
import NegociacaoBox from './NegociacaoView'

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">Negociações</h1>

        <NegociacaoBox/>
      </div>
    );
  }
}

export default App;
