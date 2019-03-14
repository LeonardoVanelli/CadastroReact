import { AssertionError } from "assert";

export default class NegociacaoDao {

    constructor(db) {

        this.db = db;
        this.store = 'negociacoes';
    }

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {
            this.db.collection(this.store)
                .insertOne(negociacao, (err, r) => {
                    if (err)
                        reject(err);
                    else
                        resolve(r);
                });
        })
    }


    listaTodos() {

        return new Promise((resolve, reject) => {

            this.db.collection(this.store)
                .find({}).toArray((err, rs) => {
                    if (err)
                        reject(err);
                    else
                        resolve(rs);
                })
        })
    }

    ApagaTodos() {

        return new Promise((resolve, reject) => {

            this.db.collection(this.store)
                .deleteMany({}, (err, rs) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                })
        })
    }
}