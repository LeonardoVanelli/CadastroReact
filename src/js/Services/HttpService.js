export default class HttpService {

    _handleErrors(res) {
        if (!res.ok)
            throw new Error(res.statusText);
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
}