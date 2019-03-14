import React, { Component } from 'react'

import ListaNegociacao from '../js/models/ListaNegociacao';
import DataHelper from '../js/helpers/DataHelper';
import PubSub from 'pubsub-js';
import Mensagem from './Mensagem';
import NegociacaoService from '../js/Services/NegociacaoService';
import Negociacao from '../js/models/Negociacao';

class FormularioNegociacao extends Component {

    constructor() {

        super();
        this.state = { data: "", quantidade: 1, valor: 0.0 }
        this.adicionarNegociacao = this.adicionarNegociacao.bind(this);
        this.limpaCampos = this.limpaCampos.bind(this);
    }

    atualizaCampo(nomeInput, event) {

        let campo = {}
        campo[nomeInput] = event.target.value;
        this.setState(campo);
    }

    limpaCampos(event) {
        this.setState({ data: "", quantidade: 1, valor: 0.0 })
    }

    adicionarNegociacao(event) {

        event.preventDefault();

        var data = DataHelper.stringParaData(this.state.data)
        let negociacao = new Negociacao(null, data, this.state.quantidade, this.state.valor);
        PubSub.publish('afterAddNegociacao', negociacao);
        this.limpaCampos(event);
    }

    render() {
        return (
            <div>
                <Mensagem />

                <form className="form" onSubmit={this.adicionarNegociacao}>

                    <div className="form-group">
                        <label>Data</label>
                        <input type="date" id="data" value={this.state.data} onChange={this.atualizaCampo.bind(this, "data")} className="form-control" required />
                    </div>

                    <div className="form-group">
                        <label >Quantidade</label>
                        <input type="number" min="1" value={this.state.quantidade} onChange={this.atualizaCampo.bind(this, "quantidade")} step="1" id="quantidade" className="form-control" required />
                    </div>

                    <div className="form-group">
                        <label >Valor</label>
                        <input id="valor" type="number" value={this.state.valor} onChange={this.atualizaCampo.bind(this, "valor")} className="form-control" min="0.01" step="0.01" required />
                    </div>

                    <button className="btn btn-primary" type="submit">Incluir</button>
                </form>
            </div>
        )
    }
}

class TabelaNegociacao extends Component {

    constructor() {

        super();
        this.limpaLista = this.limpaLista.bind(this);
    }

    limpaLista() {
        
        PubSub.publish('deleteListaNegociacao');
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    <button className="btn btn-primary text-center" type="button">
                        Importar Negociações
                    </button>
                    <button onClick={this.limpaLista} className="btn btn-primary text-center" type="button">
                        Apagar
                    </button>
                </div>
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>DATA</th>
                            <th>QUANTIDADE</th>
                            <th>VALOR</th>
                            <th>VOLUME</th>
                        </tr>
                    </thead>

                    <tbody>
                        {


                            this.props.lista.map(negociacao => {
                                return (
                                    <tr key={negociacao.id}>
                                        <td>{DataHelper.dataParaString(negociacao.data)}</td>
                                        <td>{negociacao.quantidade}</td>
                                        <td>{negociacao.valor}</td>
                                        <td>{negociacao.volume}</td>
                                    </tr>
                                )
                            })

                        }
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan="3"></td>
                            <td>
                                {this.props.total}
                            </td>
                        </tr>
                    </tfoot>

                </table>
            </div>
        )
    }
}

export default class NegociacaoBox extends Component {

    constructor() {

        super();
        this.listaNegociacao = new ListaNegociacao();
        this.state = { lista: this.listaNegociacao.negociacoes };
        this.negociacaoService = new NegociacaoService();
    }

    componentWillMount() {
        
        this.negociacaoService.listaTodos()
            .then(negociacoes => {
                
                negociacoes.forEach(negociacao => {

                    this.listaNegociacao.adiciona(negociacao)
                })
                this.setState({ lista: this.listaNegociacao.negociacoes });                
            })
    }

    componentDidMount() {

        PubSub.subscribe('afterAddNegociacao', (tag, nagociacao) => {

            this.negociacaoService.adiciona(nagociacao)
                .then(nego => {
                    this.listaNegociacao.adiciona(nego);
                    this.setState({ lista: this.listaNegociacao.negociacoes });
                    PubSub.publish('mensagem', { text: "Adicionado com sucesso", tipo: "success" })
                })
                .catch(err => {
                    PubSub.publish('mensagem', { text: "Não foi possivel incluir a negociação", tipo: "error" })
                    console.log(err);
                })
        })

        PubSub.subscribe('deleteListaNegociacao', (tag) => {

            this.negociacaoService.apagaTodos()
                .then(() => {
                    this.listaNegociacao.limpa();
                    this.setState({ lista: this.listaNegociacao.negociacoes })
                    PubSub.publish('mensagem', { text: "Lista removida com sucesso", tipo: "success" })
                })
                .catch(err => {
                    PubSub.publish('mensagem', { text: "Não foi possivel apagar a lista de negociação", tipo: "error" })
                    console.log(err);
                })

        })
    }

    render() {
        return (
            <div>
                <FormularioNegociacao />
                <TabelaNegociacao lista={this.state.lista} total={this.listaNegociacao.total} />
            </div>
        )
    }
}