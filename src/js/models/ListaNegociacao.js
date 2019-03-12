export default class ListaNegociacao {

    constructor() {

        this._negociacoes = [];
        this._total = 0;
    }

    get negociacoes() {
     
        return Array.from(this._negociacoes);
    }

    adiciona(negociacao) {

        this._negociacoes.push(negociacao);
        this._total += negociacao.volume;
    }

    limpa() {

        this._negociacoes = [];
    }

    get total() {
        return this._total;
    }
}