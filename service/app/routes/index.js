/* Código simplório, apenas para fornecer o serviço para a aplicação */

var api = require('../api').default;

module.exports = function (app) {

    app.route('/negociacoes')
        .get(api.listaTodos);

    app.route('/negociacoes')
        .post(api.cadastraNegociacao);

    app.route('/negociacoes/apagaTodos')
        .delete(api.apagaTodos);

};