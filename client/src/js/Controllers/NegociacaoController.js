import NegociacaoService from "../Services/NegociacaoService";
import PubSub from 'pubsub-js'

export default class NegociacaoController {

    constructor(negociacaoView) {

        this.negociacaoView = negociacaoView 
        this.negociacaoService = new NegociacaoService();
    }

    adiciona(negociacao){

        this.negociacaoService.adiciona(negociacao)
        .then(nego => {
            this.negociacaoView.listaNegociacao.adiciona(nego);
            this.negociacaoView.setState({ lista: this.negociacaoView.listaNegociacao.negociacoes });
            PubSub.publish('mensagem', { text: "Adicionado com sucesso", tipo: "success" })
        })
        .catch(err => {
            PubSub.publish('mensagem', { text: "Não foi possivel incluir a negociação", tipo: "error" })
            console.log(err);            
        })
    }

    listaTodos() {

        this.negociacaoService.listaTodos()
            .then(negociacoes => {

                negociacoes.forEach(negociacao => {

                    this.negociacaoView.listaNegociacao.adiciona(negociacao)
                })
                this.negociacaoView.setState({ lista: this.negociacaoView.listaNegociacao.negociacoes });
            })
            .catch(err => {
                PubSub.publish('mensagem', { text: "Não foi possivel acessar o servidor", tipo: "error" })
                console.log(err)
            })
    }

    apagaTodos() {

        this.negociacaoService.apagaTodos()
        .then(() => {
            this.negociacaoView.listaNegociacao.limpa();
            this.negociacaoView.setState({ lista: this.negociacaoView.listaNegociacao.negociacoes })
            PubSub.publish('mensagem', { text: "Lista removida com sucesso", tipo: "success" })
        })
        .catch(err => {
            PubSub.publish('mensagem', { text: "Não foi possivel apagar a lista de negociação", tipo: "error" })
            console.log(err);
        })
    }
}