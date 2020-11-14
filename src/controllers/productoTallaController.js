const modulo="/arathsBaby/productos_tallas";
const {utilService} = require('../lib/util');
const productoTallController = {};
const modulo="/arathsBaby/productos_tallas";


productoTallController.save = async(req,res)=>{
    var path ="/save"
    req.body.usuarioCreacionId =  req.user.usuarioId;
    req.body.usuarioModificoId =  req.user.usuarioId;
    req.body.proveedorId = null;
    console.log(req.body);  
    const result= await utilService.POST(req.body,modulo,path);
    if(result != null){
        res.status(200).json({errorMessage:"",successful:true});
    }else{
        res.status(200).json({errorMessage:'Error al guardar'});
    }
};

productoTallController.findAll =async(req,res)=>{
    var path=(req!=undefined)?"/1":"/0";
    const result= await utilService.GET(modulo,path);         
    if(result != null){
        const proTallas =  result.data.proTallas;
        if(req !=undefined){

            res.status(200).json({errorMessage:"",proTallas,successful:true});
        }else{
            return proTallas;
        }
        
    }else{
        if(req != undefined){
            res.status(200).json({errorMessage:'',proTallas:[]});
        }else{
            return null;
        }
        
    }
};

module.exports = productoTallController;