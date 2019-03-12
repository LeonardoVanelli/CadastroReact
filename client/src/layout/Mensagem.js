import React, { Component } from 'react'
import '../css/alerts.css'
import PubSub from 'pubsub-js';


export default class Mensagem extends Component {

    constructor() {

        super();
        this.state = {text: '', tipo: 'success' };
    }

    componentDidMount() {

        PubSub.subscribe('mensagem', (tag, mensagem) => {
            let tipo = `alert alert-${mensagem.tipo}`
            this.setState({text: mensagem.text, tipo:tipo})
        })
    }

    render() {
        return (
            <div className={this.state.tipo} role="alert">
                {this.state.text}
            </div>
        )
    }
}