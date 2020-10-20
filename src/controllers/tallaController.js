const {utilService} = require('../lib/util');
const tallaController ={};
const modulo="/arathsBaby/tallas";


tallaController.findAll =async(req,res)=>{
    var path=(req!=undefined)?"/1":"/0";
    const result= await utilService.GET(modulo,path);         
    if(result != null){
        const tallas =  result.data.tallas;
        if(req !=undefined){

            res.status(200).json({errorMessage:"",tallas,successful:true});
        }else{
            return tallas;
        }
        
    }else{
        if(req != undefined){
            res.status(200).json({errorMessage:'',tallas:[]});
        }else{
            return null;
        }
        
    }
};
module.exports = tallaController;