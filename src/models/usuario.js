const helpers = require('../lib/helpers');
let usuario ={};

usuario.table= {name:'usuario'}

usuario.columns ={
    usuarioId:{
        column:'usuario_Id',
        primarykey:true
    },
    nombre:{
        column:'nombre'
    },
    direccion:{
        column:'direccion'
    },
    telefono:{
        column:'telefono'
    },
    contrasena:{
        column:'contrasena'
    },
    estatusId:{
        column:'estatus_id'
    },
    usuarioCreacionId:{
        column:'usuario_creacion_id'
    },
    fechaCracion:{
        column:'fecha_creacion'
    },
    usuarioModificoId:{
        column:'usuario_modifico_Id'
    },
    fechaModifico:{
        column:'fecha_modifico'
    }
};

usuario = helpers.setFunctionsModels(usuario);

module.exports = usuario;