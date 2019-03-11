import React, { Component } from 'react'

class FormularioNegociacao extends Component {

    render() {
        return (
            <div>
                <div id="mensagem"></div>

                <form className="form">

                    <div className="form-group">
                        <label>Data</label>
                        <input type="date" id="data" className="form-control" required />
                    </div>

                    <div className="form-group">
                        <label >Quantidade</label>
                        <input type="number" min="1" step="1" id="quantidade" className="form-control" required />
                    </div>

                    <div className="form-group">
                        <label >Valor</label>
                        <input id="valor" type="number" className="form-control" min="0.01" step="0.01" required />
                    </div>

                    <button className="btn btn-primary" type="submit">Incluir</button>
                </form>
            </div>
        )
    }
}

class TabelaNegociacao extends Component {

    render() {
        return (
            <div>
                <div className="text-center">
                    <button className="btn btn-primary text-center" type="button">
                        Importar Negociações
                    </button>
                    <button className="btn btn-primary text-center" type="button">
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
                        <tr>
                            <td>10/10/2010</td>
                            <td>5</td>
                            <td>150</td>
                            <td>750</td>
                        </tr>

                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan="3"></td>
                            <td>
                                750
                </td>
                        </tr>
                    </tfoot>

                </table>
            </div>
        )
    }
}

export default class NegociacaoBox extends Component {

    render() {
        return (
            <div>
                <FormularioNegociacao />
                <TabelaNegociacao />
            </div>
        )
    }
}