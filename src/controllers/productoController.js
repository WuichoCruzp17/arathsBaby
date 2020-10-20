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


productoController.save = async(req,res)=>{

    var path ="/save"
    req.body.usuarioCreacionId =  req.user.usuarioId;
    req.body.usuarioModificoId =  req.user.usuarioId;
    req.body.productoId = null;
    const result= await utilService.POST(req.body,modulo,path);
    if(result != null){
        res.status(200).json({errorMessage:"",successful:true});
    }else{
        console.log(result);
        res.status(200).json({errorMessage:result.data.errorMessage});
    }

};

module.exports = productoController;
