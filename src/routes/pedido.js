const express =    require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const {isLoggedIn,isNotLoogedin,validateAccesousUsuario} = require('../lib/auth');

router.get('/',pedidoController.index);
router.get('/findAll',isLoggedIn,pedidoController.findAll);

module.exports = router;