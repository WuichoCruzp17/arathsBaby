const proveedorController = {};
const {proveedor,mesages,global} = require('../propertis');
const codeBss = require('../resources/codeBss');
const {utilService} = require('../lib/util');
const modulo="/arathsBaby/proveedores";
proveedorController.index =(req,res)=>{
    console.log(req.user);
    res.render('arathsBaby/proveedores',{proveedor,msg:mesages,global})
};

proveedorController.save =async (req,res)=>{
    
    var path ="/save"
    req.body.usuarioCreacionId =  req.user.usuarioId;
    req.body.usuarioModificoId =  req.user.usuarioId;
    req.body.proveedorId = null;
    console.log(req.body);  
    const result= await utilService.POST(req.body,modulo,path);
    if(result != null){
        res.status(200).json({errorMessage:"",successful:true});
    }else{
        res.status(200).json({errorMessage:''});
    }
};
proveedorController.updateStatus =async (req,res)=>{
    
    var path ="/updateStatus"
    req.body.usuarioModificoId =  req.user.usuarioId;
    console.log(req.body);  
    req.body.estatusId =(req.body.estatusId ==true) ? codeBss.INACTIVO :codeBss.ACTIVO;  
   
    const result= await utilService.POST(req.body,modulo,path);
    if(result != null){
        res.status(200).json({errorMessage:"",successful:true});
    }else{
        res.status(200).json({errorMessage:''});
    }
};

proveedorController.findById = async (req,res)=>{
    var path="/findById/"+req.params.id;
    console.log("Ruta de GET--->"+path);
    const result= await utilService.GET(modulo,path);         
    if(result != null){
        const proveedor =  result.data.proveedor;
        res.status(200).json({errorMessage:"",proveedor,successful:true});
    }else{
        res.status(200).json({errorMessage:'',proveedor:{}});
    }
};

proveedorController.findAll = async (req,res)=>{
    var path="/";
    const result= await utilService.GET(modulo,path);         
    if(result != null){
        const proveedores =  result.data.proveedores;
        res.status(200).json({errorMessage:"",proveedores,successful:true});
    }else{
        res.status(200).json({errorMessage:'',proveedores:[]});
    }
};


module.exports = proveedorController;