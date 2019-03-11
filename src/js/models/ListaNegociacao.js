export class ListaNegociacao {

    constructor() {

        this._negociacoes = [];
        this._total = 0;
    }

    get negociacoes() {
     
        return Array.from(this._negociacoes);
    }

    set negociacoes(negociacao) {

        this._negociacoes.push(negociacao);
        this._total++;
    }
}