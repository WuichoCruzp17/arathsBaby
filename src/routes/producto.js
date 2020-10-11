const express =    require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const {isLoggedIn,isNotLoogedin,validateAccesousUsuario} = require('../lib/auth');
router.get('/', isLoggedIn,productoController.index);
router.post('/save',isLoggedIn,productoController.save);
/* router.get('/findById/:id', isLoggedIn,productoController.findById);
router.post('/update',isLoggedIn,productoController.update);
router.post('/updateStatus',isLoggedIn,productoController.updateStatus);
router.get('/findAll',isLoggedIn, productoController.findAll); */

module.exports = router;