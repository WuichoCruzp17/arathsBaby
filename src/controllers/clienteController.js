const {utilService} = require('../lib/util');
const {producto,mesages,global,proTalla} = require('../propertis');
const codeBss = require('../resources/codeBss');
const clienteController ={};
const modulo="/arathsBaby/clientes";

clienteController.index = async(req,res)=>{
    res.render('arathsBaby/clientes');
};

clienteController.findAll = async (req,res)=>{
    var path=(req!=undefined)?"/1":"/0";
    const result= await utilService.GET(modulo,path);         
    if(result != null){
        const clientes =  result.data.clientes;
        if(req !=undefined){

            res.status(200).json({errorMessage:"",clientes,successful:true});
        }else{
            return clientes;
        }
        
    }else{
        if(req != undefined){
            res.status(200).json({errorMessage:'',clientes:[]});
        }else{
            return null;
        }
        
    }
};

module.exports = clienteController;
