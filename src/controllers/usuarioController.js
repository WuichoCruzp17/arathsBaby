const usuario  = require('../models/usuario');
const usuarioController = {};


usuarioController.findByProperty = async(property,value,cols) =>{
    return await usuario.findByProperty(property,value, cols);
}

usuarioController.findById = async(req,res)=>{
    var e = await usuario.findById(req.params.id);  
    console.log(req.params.id);  
    res.status(200).json({errorMessage:'',usuario:e});

}

module.exports = usuarioController;