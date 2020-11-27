const mysql =    require('mysql');
const {database} =    require('./keys');
const {promisify} = require('util');
const pool =mysql.createPool(database);

try{
    pool.getConnection((err, connection)=>{
        console.log("Entro a la conexion"+err) 

        if(err){
            if(err =='PROTOCOL_CONNECTION_LOST'){
                console.error('Database connection was closed');
            }
            if(err==='ER_CON_COUNT_ERROR'){
                console.error('Database has to many connections');
            }
            if(err ==='ECONNREFUSED'){
                console.error('Database connection was refused');
            }
            if(err ==='ER_ACCESS_DENIED_ERROR'){
                console.error("Acceso denegado");
            }
            if(err="connect ETIMEDOUT"){
                console.log("Error en la conexión");
                pool.query = null;
            }
        }else{
            if(connection){
                connection.release();
                console.log('DB is Connected');
                //Promisify Pool Query
                pool.query =    promisify(pool.query);
            } 
        }
         
    });
}catch(err){
    console.log("Error de conexion-->"+err);
}

module.exports = pool;