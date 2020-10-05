const categoriaController = {};
var http = require('http');
const constantes = require('../keys');
const mold="/categorias";
categoriaController.findAll =(req,res)=>{
       
    var path ="/"
    var options ={
        host:constantes.uri+mold,
        port:process.env.PORT || 3001,
        path:path,
        method:'POST',
        encoding: null
    };
    req.body.usuarioId =  req.user.usuarioId;
    console.log("JSON "+JSON.stringify(req.body));
    invocarServicio(options,JSON.stringify(req.body),function(proveedores,err){
        if(err){
            res.status(500).json({errorMessage:err,categorias:{}});
        }else{
            res.status(200).json({errorMessage:'',categorias:{}});
        }
        
    });
};  
