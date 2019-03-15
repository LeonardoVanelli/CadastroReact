
import mongo from 'mongodb'
const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017/CadastroReact'
const dbName = 'CadastroReact';



export default class ConnectionFactory {

    constructor() {

        throw new Error('Essa classe n pode ser sobescrita')
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            const client = new MongoClient(url, { useNewUrlParser: true })

            client.connect(function (err, client) {
                
                if (err)
                    reject(err);

                resolve(client.db(dbName));                
            })
        })
    }
}