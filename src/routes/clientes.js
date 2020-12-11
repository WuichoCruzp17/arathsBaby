const express =    require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const {isLoggedIn,isNotLoogedin,validateAccesousUsuario} = require('../lib/auth');
router.get('/', isLoggedIn,clienteController.index);
router.get('/findAll',isLoggedIn, clienteController.findAll);

module.exports = router;