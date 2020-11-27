const {utilService} = require('../lib/util');
const {producto,mesages,global,proTalla} = require('../propertis');
const codeBss = require('../resources/codeBss');
const categoriaController = require('../controllers/categoriaController');
const proveedorController = require('../controllers/proveedorController');
const tallaController = require('../controllers/tallaController');
const productoController ={};
const modulo="/arathsBaby/productos";

productoController.index = async (req,res)=>{

    const categorias = await categoriaController.findAll();
    const proveedores = await proveedorController.findAll();
    const tallas = await tallaController.findAll();
    console.log(tallas);
    res.render('arathsBaby/productos',{categorias:(categorias!=null)?categorias:[],proveedores:(proveedores!=null)?proveedores:[],tallas:(tallas!=null)?tallas:[],mesages,producto,global,proTalla})

};

productoController.findById = async (req,res)=>{
    var path="/findById/"+req.params.id;
    const result= await utilService.GET(modulo,path);         
    if(result != null){
        const prod =  result.data.producto;
        res.status(200).json({errorMessage:"",producto:prod,successful:true});
    }else{
        res.status(200).json({errorMessage:'',proveedor:{}});
    }
};
productoController.save = async(req,res)=>{

    var path ="/save"
   //console.log(Object.keys(req.body))
    console.log("Primero"+Object.keys(req.body)[0])
    console.log("Nombre --->"+req.body["nombre"]);
    var body = JSON.parse(Object.keys(req.body)[0]);
    console.log("Usuario---->"+req.user.usuarioId)
    body.usuarioCreacionId =  req.user.usuarioId;
    body.usuarioModificoId =  req.user.usuarioId;
    body.productoId = null;
    console.log("BOdy a envar --->"+Object.keys(req.body));
    const result= await utilService.POST(body,modulo,path);
    if(result != null){
        res.status(200).json({errorMessage:"",successful:true});
    }else{
        
        res.status(200).json({errorMessage:result});
    }

};

productoController.saveImage = async(req,res)=>{
    var path ="/save"
    console.log(Object.keys(req.body))
    var body = JSON.parse(Object.keys(req.body)[0]);
    console.log(body);
    body.productoId = null;
    var ruta = "/arathsBaby/image";

    const result= await utilService.POST(body,ruta,path);
    if(result != null){
        res.status(200).json({errorMessage:"",successful:true});
    }else{
        
        res.status(200).json({errorMessage:result});
    }
};

productoController.findAll = async (req,res)=>{
    var path=(req!=undefined)?"/1":"/0";
    const result= await utilService.GET(modulo,path);         
    if(result != null){
        const productos =  result.data.productos;
        if(req !=undefined){

            res.status(200).json({errorMessage:"",productos,successful:true});
        }else{
            return productos;
        }
        
    }else{
        if(req != undefined){
            res.status(200).json({errorMessage:'',productos:[]});
        }else{
            return null;
        }
        
    }
};

module.exports = productoController;
