const loginController = {};
const passport = require('passport');
//const flash=require('connect-flash');
const usuarioController =  require('../controllers/usuarioController');

loginController.login =async (req, res)=> {

    const  perfiles =[];
        console.log("Mensaje --->"+req.flash('message'));
    res.render('login', {perfiles,error:req.flash('message')});
};

loginController.getUser = async(login)=>{
    var rows = null;

            rows = await usuarioController.findByProperty('nombreUsuario',login.username);

    return rows;
};

loginController.validateSession =async(req, res, next)=>{
  await passport.authenticate('local.signin',{
    successRedirect:'/arathsBaby/index',
    failureRedirect:'/',
    failureFlash:true   
   })(req, res, next);
};

loginController.getLogout = (req, res)=>{
    req.logOut();
};


module.exports = loginController;