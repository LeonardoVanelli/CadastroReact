import React, { Component } from 'react';
import '../css/bootstrap.css';
import '../css/bootstrap-theme.css';
import NegociacaoBox from './NegociacaoView'

class App extends Component {

  componentWillMount() {

    //let dado = { data: new Date(), quantidade: 10, valor: 500 }
    // fetch('/negociacoes', {
    //   headers: { "Content-type": "application/json" },
    //   method: "post",
    //   body: JSON.stringify(dado)
    // })
    //   .then(result => result.json())
    //   .then(negociacao => console.log(negociacao))
    //   .catch(err => console.log(err))


    // fetch('/negociacoes')
    //   .then(res => res.json())
    //   .then(negociacoes => console.log(negociacoes))
    //   .catch(err => console.log(err))

    // fetch('/negociacoes/apagaTodos', {
    //   method: "delete"
    // })
    //   .then(res => res.json())
    //   .then(msg => console.log(msg))
    //   .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Negociações</h1>

        <NegociacaoBox />
      </div>
    );
  }
}

export default App;
