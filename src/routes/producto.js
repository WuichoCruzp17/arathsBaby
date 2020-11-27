const express =    require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const {isLoggedIn,isNotLoogedin,validateAccesousUsuario} = require('../lib/auth');
router.get('/', isLoggedIn,productoController.index);
const path =    require('path');
var multer = require('multer'); // v1.0.5
var upload = multer({dest:path.join(__dirname,'../public/assets/temp')}); // for parsing multipart/form-data
router.post('/save',isLoggedIn,upload.single('image'),productoController.save);
router.post('/saveImg',isLoggedIn,productoController.saveImage);
router.get('/findById/:id', isLoggedIn,productoController.findById);
/* 
router.post('/update',isLoggedIn,productoController.update);
router.post('/updateStatus',isLoggedIn,productoController.updateStatus);
router.get('/findAll',isLoggedIn, productoController.findAll); */
router.get('/findAll',isLoggedIn, productoController.findAll);

module.exports = router;