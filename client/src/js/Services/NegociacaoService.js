import HttpService from "./HttpService";
import Negociacao from "../models/Negociacao";

export default class NegociacaoService {

    constructor() {

        this.url = '/negociacoes'
        this.httpService = new HttpService();
    }

    adiciona(negociacao) {

        return this.httpService.post(this.url, negociacao)
            .then(res => res.json())
            .then(negociacao =>
                new Negociacao(
                    negociacao._id,
                    new Date(negociacao._data),
                    negociacao._quantidade,
                    negociacao._valor
                ))
    }

    listaTodos() {
        return this.httpService.get(this.url)
            .then(objs => objs.map(negociacao =>
                new Negociacao(
                    negociacao._id,
                    new Date(negociacao._data),
                    negociacao._quantidade,
                    negociacao._valor
                )
            ))
    }

    apagaTodos() {
        return this.httpService.delete(this.url + '/apagaTodos')
    }
}