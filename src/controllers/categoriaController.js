const categoriaController = {};
const {utilService} = require('../lib/util');
const {categoria,mesages,global} = require('../propertis');
const modulo="/arathsBaby/categorias";


categoriaController.index = (req,res)=>{
    res.render('arathsBaby/categorias',{categoria,mesages,global})
};


categoriaController.save =async (req,res)=>{
    
    var path ="/save"
    req.body.usuarioCreacionId =  req.user.usuarioId;
    req.body.usuarioModificoId =  req.user.usuarioId;
    req.body.categoriaId = null;
    console.log(req.body);  
    const result= await utilService.POST(req.body,modulo,path);
    if(result != null){
        res.status(200).json({errorMessage:"",successful:true});
    }else{
        res.status(200).json({errorMessage:'Error al guardar'});
    }
};


categoriaController.update = async(req,res)=>{
    var path ="/update";
    req.body.usuarioModificoId =  req.user.usuarioId;
    const result = await utilService.POST(req.body,modulo,path);
    if(result != null){
        res.status(200).json({errorMessage:"",successful:true});
    }else{
        res.status(200).json({errorMessage:'Error en el servidor'});
    }
};

categoriaController.updateStatus =async (req,res)=>{
    
    var path ="/updateStatus"
    req.body.usuarioModificoId =  req.user.usuarioId;
    console.log(req.body);  
    req.body.estatusId =(req.body.estatusId ==codeBss.ACTIVO) ? codeBss.INACTIVO :codeBss.ACTIVO;  
   
    const result= await utilService.POST(req.body,modulo,path);
    if(result != null){
        res.status(200).json({errorMessage:"",successful:true});
    }else{
        res.status(200).json({errorMessage:''});
    }
};


categoriaController.findById = async (req,res)=>{
    var path="/"+req.params.id;
    const result= await utilService.GET(modulo,path);         
    if(result != null){
        const categoria =  result.data.categoria;
        res.status(200).json({errorMessage:"",categoria,successful:true});
    }else{
        res.status(200).json({errorMessage:'',categoria:null});
    }
};

categoriaController.findAll =async (req,res)=>{
       
    var path ="/ "
     req.body.usuarioId =  req.user.usuarioId;
     const result= await utilService.GET(modulo,path);
        if(result){
            res.status(200).json({errorMessage:'',categorias:result.data.categorias,successful:true});
        }else{
            console.log(result);
            res.status(200).json({errorMessage:'Error en el servidor',categorias:null});
        }
};  

module.exports = categoriaController;