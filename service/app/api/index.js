/* Código simplório, apenas para fornecer o serviço para a aplicação */
import NegociacoesService from '../../src/services/NegociacaoService';

var api = {}

var dataAtual = new Date();
var dataAnterior = new Date();
dataAnterior.setDate(dataAtual.getDate() - 7);
var dateRetrasada = new Date();
dateRetrasada.setDate(dataAtual.getDate() - 14);

api.listaTodos = function (req, res) {

    new NegociacoesService()
        .buscaTodos()
        .then(negociacoes => res.json(negociacoes))
        .catch(err => res.status(500).json(err))
}

api.cadastraNegociacao = (req, res) => {

    new NegociacoesService()
        .adiciona(req.query)
        .then(response => res.status(200).json(response.ops))
        .catch(err => res.status(200).json(err));
}

api.apagaTodos = (req, res) => {
    
    new NegociacoesService()
        .apaga()
        .then(() => res.status(200).json("Lista apagada com sucesso"))
        .catch(err => res.status(200).json(err))
}

export default api;