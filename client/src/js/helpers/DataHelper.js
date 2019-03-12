export default class DataHelper {

    constructor () {

        throw new Error("Essa classe não pode ser instanciada");
    }

    static dataParaString(data){

        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
    }

    static stringParaData(string) {

        let dataSeparada = string.split('-');
        dataSeparada[1] = dataSeparada[1] - 1;
        return new Date(...dataSeparada);

    }
}