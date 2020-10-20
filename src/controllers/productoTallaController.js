const modulo="/arathsBaby/productos_tallas";
const {utilService} = require('../lib/util');
const productoTallController = {};

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