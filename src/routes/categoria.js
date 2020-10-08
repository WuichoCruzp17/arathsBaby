const express =    require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const {isLoggedIn,isNotLoogedin,validateAccesousUsuario} = require('../lib/auth');
router.get('/', isLoggedIn,categoriaController.index);
router.get('/findById/:id', isLoggedIn,categoriaController.findById);
router.post('/save',isLoggedIn,categoriaController.save);
router.post('/update',isLoggedIn,categoriaController.update);
router.post('/updateStatus',isLoggedIn,categoriaController.updateStatus);
router.get('/findAll',isLoggedIn, categoriaController.findAll);

module.exports = router;