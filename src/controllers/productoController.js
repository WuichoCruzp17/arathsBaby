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
    console.log(Object.keys(req.body))
    var body = JSON.parse(Object.keys(req.body)[0]);
    console.log("Usuario---->"+req.user.usuarioId)
    body.usuarioCreacionId =  req.user.usuarioId;
    body.usuarioModificoId =  req.user.usuarioId;
    body.productoId = null;
    console.log("BOdy a envar --->"+JSON.stringify(body));
    const result= await utilService.POST(body,modulo,path);
    if(result != null){
        res.status(200).json({errorMessage:"",successful:true});
    }else{
        
        res.status(200).json({errorMessage:result});
    }

};

module.exports = productoController;
