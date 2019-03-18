import Validation from './Validation'
import Negociacao from '../models/Negociacao';

export default class NegociacaoValidation extends Validation {

    valida(model) {

        let negociacao = new Negociacao(null, new Date(model._data), model._quantidade, model._valor)

        Object.getOwnPropertyNames(negociacao).forEach(propName => {
            if (propName == '_id')
                return

            let property = Object.getOwnPropertyDescriptor(negociacao, propName)
            if (property.value == null)
                this.errors.push({ tipo: 'notNull', text: `O campo ${propName} não pode conter um valor nulo` })

            if (property.enumerable && property.value <= 0)
                this.errors.push({ tipo: 'MaiorZero', text: `O campo ${propName} deve conter um numero maior que 0` })

            if (this.errors.length > 0)
                throw new Error('Algo deu errado');
        })
    }
}