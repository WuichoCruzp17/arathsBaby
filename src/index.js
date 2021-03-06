const express =    require('express');
const morgan =    require('morgan');
const expresshbs =  require('express-handlebars');
const path =    require('path');
const flash=require('connect-flash');
const session =    require('express-session');
const mysqlStore=    require('express-mysql-session');
const bodyParser = require('body-parser');
const {database,errorpage} =    require('./keys');
const passport =    require('passport');
const multer = require('multer');
//Initizations
const app =    express();
require('./lib/passport');
//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.use(flash());//Enviar mensajes
app.engine('.hbs',expresshbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), '/layouts'),
    partialsDir:path.join(app.get('views'), '/partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars')
}));
app.set('view engine','.hbs');
console.log(database);
//Middlewares -> Se ejecuta en cada peticion al servidor
app.use(session({
    secret:'fatzmysqlnodesession',
    resave:false,
    saveUninitialized:false,
    store: new mysqlStore(database)
}));
app.use(multer({dest:path.join(__dirname,'../public/assets/temp')}).single('image'));

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(passport.initialize());
app.use(passport.session());
//Global Variables
app.use((req, res, next)=>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user    =req.user;
    next();
});
console.log("Muestro log");
//Routes
app.use(require('./routes/login'));
app.use('/arathsBaby/index', require('./routes/index'));
app.use('/arathsBaby/usuario', require('./routes/usuario'));
app.use('/arathsBaby/proveedores', require('./routes/proveedor'));
app.use('/arathsBaby/categorias', require('./routes/categoria'));
app.use('/arathsBaby/productos', require('./routes/producto'));
app.use('/arathsBaby/pedidos', require('./routes/pedido'));
app.use('/arathsBaby/clientes', require('./routes/clientes'));
//Public
app.use(express.static(path.join(__dirname, 'public')));
//Startin server
app.listen(app.get('port'),()=>{
    console.log('Server on por', app.get('port'));
});

