export default class HttpService {

    _handleErrors(res) {
        if (!res.ok){
            res.json().then(res => console.log(res));
            throw new Error(res);
        }
        return res;
    }

    async get(url) {
        const res = await fetch(url);
        const res_2 = this._handleErrors(res);
        return res_2.json();
    }

    post(url, dado) {

        return fetch(url, {
            headers: { "Content-type": "application/json" },
            method: "post",
            body: JSON.stringify(dado)
        })
        .then(res => this._handleErrors(res))
    }

    delete(url) {

        return fetch(url, {            
            method: "delete"            
        })
        .then(res => this._handleErrors(res))
    }
}