const {utilService} = require('../lib/util');
const {producto,mesages,global} = require('../propertis');
const codeBss = require('../resources/codeBss');
const categoriaController = require('../controllers/categoriaController');
const proveedorController = require('../controllers/proveedorController');
const productoController ={};
const modulo="/arathsBaby/productos";

productoController.index = async (req,res)=>{

    const categorias = await categoriaController.findAll();
    const proveedores = await proveedorController.findAll();

    res.render('arathsBaby/productos',{categorias:(categorias!=null)?categorias:[],proveedores:(proveedores!=null)?proveedores:[],mesages,producto,global})

};


module.exports = productoController;
