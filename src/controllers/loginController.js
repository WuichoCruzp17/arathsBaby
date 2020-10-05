const loginController = {};
const passport = require('passport');
const usuarioController =  require('../controllers/usuarioController');

loginController.login =async (req, res)=> {

    const  perfiles =[];
    res.render('login', {perfiles});
};

loginController.getUser = async(login)=>{
    var rows = null;

            rows = await usuarioController.findByProperty('nombre',login.username);

    return rows;
};

loginController.validateSession =async(req, res, next)=>{
  await passport.authenticate('local.signin',{
    successRedirect:'/arathsBaby/index',
    failureRedirect:'/'
   })(req, res, next);
};

loginController.getLogout = (req, res)=>{
    req.logOut();
};


module.exports = loginController;