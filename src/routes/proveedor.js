const express =    require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');
const {isLoggedIn,isNotLoogedin,validateAccesousUsuario} = require('../lib/auth');
router.get('/', isLoggedIn,proveedorController.index);
router.get('/findById/:id', isLoggedIn,proveedorController.findById);
router.post('/save',isLoggedIn,proveedorController.save);
router.post('/updateStatus',isLoggedIn,proveedorController.updateStatus);
router.get('/findAll',isLoggedIn, proveedorController.findAll);

module.exports = router;