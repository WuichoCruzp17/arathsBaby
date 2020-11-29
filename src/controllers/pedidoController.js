const pedidoController={};
const {utilService} = require('../lib/util');
const modulo="/arathsBaby/pedidos";

pedidoController.index = async(req,res)=>{
    res.render('arathsBaby/pedidos');
};

pedidoController.findAll = async (req,res)=>{
    var path=(req!=undefined)?"/1":"/0";
    const result= await utilService.GET(modulo,path);         
    if(result != null){
        const pedidos =  result.data.pedidos;
        if(req !=undefined){

            res.status(200).json({errorMessage:"",pedidos,successful:true});
        }else{
            return pedidos;
        }
        
    }else{
        if(req != undefined){
            res.status(200).json({errorMessage:'',pedidos:[]});
        }else{
            return null;
        }
        
    }
};

module.exports = pedidoController;