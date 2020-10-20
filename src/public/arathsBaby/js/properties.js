const proveedor={
    FRM_NAME_ID:'frm_proveedor',
    FRM_ID:'proveedorId',
    FRM_NAME:'nombre',
    FRM_RFC:'rfc',
    FRM_RZS:'razonSocial',
    FRM_TELE:'telefono',
    FRM_EMAIL:'correo',
    FRM_PHONE:'celular',
    FRM_ESTATUS:'estatusId',
    LEGEND:'Proveedor',
    KEY_NAME:'Nombre',
    KEY_RFC:'RFC',
    KEY_RZS:'Razon Social',
    KEY_TELE:'Telefono',
    KEY_EMAIL:'Correo',
    KEY_PHONE:'Celular',
    KEY_ESTATUS:'Estatus',
    msg_name:'Nombre es requerido'
};  


const categoria ={
    FRM_NAME_ID:'frm_categoria',
    FRM_ID:'categoriaId',
    FRM_NAME:'nombre',
    FRM_DESC:'descripcion',
    LEGEND:'Categoria',
    LEGEND_TABLE:'Lista de Categorías',
    msg_name:'Es requerido',
    KEY_NAME:'Nombre',
    KEY__DESC:'Descripción'
};

const producto={
    FRM_NAME_ID:'frm_producto',
    FRM_ID:'productoId',
    FRM_NAME:'nombre',
    FRM_DESC:'descripcion',
    FRM_CANT:'cantidad',
    FRM_PRECIO:'precio',
    FRM_CATEGORIA:'categoriaId',
    FRM_PROV:'proveedorId',
    FRM_UPLOAD:'upload',
    FRM_DESCONT:'descontinuado',
    FRM_ESTATUS:'estatusId',
    FRM_PROTALLA:'producto_tallas',
    LEGEND:'Producto',
    KEY_NAME:'Nombre',
    KEY_DESC:'Descripción',
    KEY_PRECIO:'Precio',
    KEY_UPLOAD:'Imagen del Producto',
    KEY_CANT:'Canatidad',
    KEY_CATEGORIA:'Categoría',
    KEY_PROV:'Proveedor',
    KEY_DESCONT:'Descontinuado?',
    KEY_PROTALLA:'Tallas?',
    msg_name:'Nombre es requerido'
};  

const talla ={
    FRM_NAME_ID:'frm_talla',
    FRM_ID:'tallaId',
    FRM_NAME:'nombre',
    FRM_DESC:'descripcion',
    FRM_CATEGORIA:'categoriaId',
    KEY_NAME:'Nombre',
    KEY_DESC:'Descripción'
};

const proTalla ={
    FRM_NAME_ID:'frm_proTalla',
    FRM_ID:'protalla_id',
    FRM_PRODUCTO:'productoId',
    FRM_TALLA:'tallaId',
    FRM_DESC:'descripcion',
    FRM_CANT:'cantidad',
    KEY_DESC:'Descripción',
    KEY_CANT:'Canatidad',
    DIV_LISTA:'div_lista',
    DIV_SHOW:'show',
    msg_name:'Nombre es requerido'
};

const mesages={
    msg_lon_M:'El ${text} no debe de superar ${number} caracteres',
    msg_lon_m:'El ${text} debe de cumplir por lo menos ${number} caracteres'
};

const global ={
    FRM_SAVE:'save',
    FRM_MOD:'mod',
    FRM_CLEAN:'clean',
    KEY_SAVE:'Guardar',
    KEY_MOD:'Modificar',
    KEY_CLEAN:'Limpiar'
};