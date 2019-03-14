import ConnectionFactory from './ConnectionFactory'
import NegociacaoDao from '../dao/NegociacaoDao'

export default class NegociacaoService {

	adiciona(negociacao) {

		return ConnectionFactory
			.getConnection()
			.then(db => new NegociacaoDao(db))
			.then(dao => dao.adiciona(negociacao))
			.catch((err) => {
				throw new Error(err)
			})
	}

	buscaTodos() {

		return ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.listaTodos())
			.catch((err) => {
				throw new Error(err)
			})
	}

	apaga() {

		return ConnectionFactory
			.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.ApagaTodos())
			.catch((err) => {
				throw new Error(err)
			})
	}
}