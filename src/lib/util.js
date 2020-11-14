const axios = require('axios');
const constantes = require('../keys');
const util = {

    validateUnderScript: function (string) {
        return string.split('_').length > 1 ? true : false;
    },

    convertColumns: async function (column) {
        if (util.validateUnderScript(column)) {
            const arr = column.split('_');
            return column = arr[0] + util.getFirstCapitalLetter(arr[1]);
        } else { return column; }
    },

    getFirstCapitalLetter: function (letter) {
        const arr = letter.split('');
        var string = "";
        for (var i = 0; i < arr.length; i++) {
            string += (i === 0) ? arr[i].toLocaleUpperCase() : arr[i];
        }
        return string;
    },

    validateObjetc: function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    } 
};

const utilString = {
    validateString: function (obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
};

const utilService ={

     POST:async function (data,modulo,path){
        var resuslt = null;
        try{
             resuslt = await axios.post(constantes.uri+modulo+path,data);
        }catch(error){
            console.log("Error en el servicio"+error);
        }
        
        return resuslt;
    },

    GET:async function(modulo,path){
        var resuslt = null;
        try{
             resuslt = await axios.get(constantes.uri+modulo+path);
        }catch(error){
            //console.log(error);
        }
        
        return resuslt;
    }
    

};

module.exports = {util, utilString,utilService};