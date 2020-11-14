document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

const productoJS ={};

productoJS.validateModel=function(event){
    const result = util.validateForm(event.target.value, producto);
    if(result.validate){
        if(result.entity.productoId==""){
         
            if(result.entity.producto_tallas){
                result.entity.cantidad = modsJS.grid.gridData.length;
                result.entity.productosTalla = JSON.parse(JSON.stringify(modsJS.grid._data.gridData));
            }
            productoJS.save(result.entity);
        }else{
            productoJS.update(result.entity);
        }
        
    }
};

productoJS.limpiar = function(){
    const form = document.getElementById(producto.FRM_NAME_ID);
    form.reset();
};

productoJS.save=async function(model){
    model.descontinuado=modsJS.frm_producto.$data.descontinuado;
    model.upload  = {};
    model.upload.ext  = modsJS.img.ext;
    model.upload.path  = modsJS.img.path;
    const result = await utilXHTTP.post("productos/save",JSON.stringify(model));
    if(result.successful){
        messageJS.showMessage("Procedimiento exitoso","Se ha  guardado el nuevo producto","success");
        proTallaJS.limpiarTabla();
        modsJS.grid.show = false;
        //productoJS.findAll();
        productoJS.limpiar();
    }else{
        messageJS.showMessage('Error en el servior','Ups, hubo un problema en el servidor, vuelva a intentarlo o vuelva mas tarde','error');
    }
};

productoJS.update = async function(model){
    const result = await utilXHTTP.post('productoes/update/',model);
    if(result.successful){
        messageJS.showMessage('Procedimiento exitoso',"Se ha actualizado la información");
        productoJS.findAll();
        productoJS.limpiar();
    }else{
        messageJS.showMessage('Error en el servior','Ups, hubo un problema en el servidor, vuelva a intentarlo o vuelva mas tarde','error');
    }
};

productoJS.changeStatus = async function(productoId){
    var model ={};
    for(var i =0;i<modsJS.grid.gridData.length;i++){
        if(modsJS.grid.gridData[i].productoId == productoId){
            model = modsJS.grid.gridData[i];
        }
    }
    productoJS.updateStatus(model);
};

productoJS.updateStatus = async function(model){

    const result = await utilXHTTP.post('productoes/updateStatus', model);
    if(result.successful){
        messageJS.showMessage('Procedimiento exitoso',"Se ha actualizado la información");
        productoJS.findAll();
        productoJS.limpiar();
    }else{
        messageJS.showMessage('Error en el servior','Ups, hubo un problema en el servidor, vuelva a intentarlo o vuelva mas tarde','error')
    }
}

productoJS.findById = async function(id){
    const result = await utilXHTTP.get('productoes/findById/'+id);
    if(result.successful){
        util.updateFrom(modsJS[producto.FRM_NAME_ID], result.producto);
    }
};

productoJS.findAll = async function(){
    const result = await utilXHTTP.get('productoes/findAll');
    console.log(result);
    if(result.successful){
        modsJS.grid._data.gridData =[];
        modsJS.grid._data.gridData =result.productoes;
    }
};
const proTallaJS ={};

proTallaJS.limpiar = function(){
    const form = document.getElementById(proTalla.FRM_NAME_ID);
    form.reset();
};

proTallaJS.validateModel=function(event){
    const result = util.validateForm(event.target.value, proTalla);
    if(result.validate){
        if(result.entity[proTalla.FRM_POSI] ==""){
            if(modsJS.frm_producto.$data[producto.FRM_ID]!=""){
                proTallaJS.save();
            }else{
                result.entity.talla =jQuery('select[name="tallaId"] option:selected').text();
                modsJS.grid._data.gridData.push(result.entity);
                const proTallas =modsJS.grid._data.gridData;
                var cantidad =0;
                for(var i =0;i<proTallas.length;i++){
                    cantidad=cantidad+parseInt(proTallas[i].cantidad);
                }
                modsJS[producto.FRM_NAME_ID].$data[producto.FRM_CANT]= cantidad;
                proTallaJS.limpiar();
                jQuery("#cerrarModal").click();
            }

        }else{
            modsJS.grid._data.gridData[parseInt(proTalla.FRM_POSI)] = result.entity;
        }
    }
};
proTallaJS.save =  async function(){

};

proTallaJS.limpiarTabla  = function(){
    modsJS.grid.$data.gridData = []
}

const modsJS ={};

modsJS.img ={};

modsJS.ini =function(){

    modsJS.onChangeFile=function(e){
        // Creamos el objeto de la clase FileReader
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        console.log(reader);
        reader.onload = function(){
            console.log(reader);
        }
    };

/*     modsJS.grid = utilGrid.createGrid({
        script:'#grid-template',
        element:'#demo',
        columns:[
            {name:'Nombre', column:'nombre'},{name:'RFC', column:'rfc'}, {name:'Contacto', column:'correo'},{name:'', column:''}
        ],
        data:[],
        component:modsJS.getComponent()
    }); */

   // productoJS.findAll();

   modsJS.grid = utilGrid.createGrid({
    script:'#grid-template',
    element:'#demo',
    columns:[
        {name:'Talla', column:'talla'},{name:'Descripcion', column:'descripcion'},{name:'Cantidad', column:'cantidad'},{name:'', column:''}
    ],
    data:[],
    show:false,
    component:modsJS.getComponent()
});

modsJS[producto.FRM_NAME_ID] =null;
const data_frm_prod ={};
data_frm_prod[producto.FRM_ID] ='';
data_frm_prod[producto.FRM_NAME] ="";
data_frm_prod[producto.FRM_DESC] ='';
data_frm_prod[producto.FRM_CANT] ='';
data_frm_prod[producto.FRM_PRECIO] ='';
data_frm_prod[producto.FRM_UPLOAD] ='';
data_frm_prod[producto.FRM_CATEGORIA] ='0';
data_frm_prod[producto.FRM_PROV] ='0';
data_frm_prod[producto.FRM_DESCONT] =false;
data_frm_prod[producto.FRM_PROTALLA] =false;

modsJS[producto.FRM_NAME_ID] =util.createVueFrom({
    el:'#'+producto.FRM_NAME_ID,
    model:data_frm_prod,
    methods:{
        validateSupplier:productoJS.validateModel,
        limpiar:productoJS.limpiar,
        onChangeFile:modsJS.onChangeFile,
        onChangeFileTalla:function($event){
            modsJS.grid.show= modsJS[producto.FRM_NAME_ID][producto.FRM_PROTALLA];
        }
    }

});

const data_frm_proTalla  ={};
modsJS[proTalla.FRM_NAME_ID] =null;
data_frm_proTalla[proTalla.FRM_TALLA] ='0';
data_frm_proTalla[proTalla.FRM_DESC] ='';
data_frm_proTalla[proTalla.FRM_POSI] ='';
data_frm_proTalla[proTalla.FRM_ID] ='';
data_frm_proTalla[proTalla.FRM_CANT] ='';
modsJS[proTalla.FRM_NAME_ID] =util.createVueFrom({
    el:'#'+proTalla.FRM_NAME_ID,
    model:data_frm_proTalla,
    methods:{
        validateSupplier:productoJS.validateModel,
        limpiar:proTalla.limpiar
    }

});

modsJS[proTalla.MODAL_BOT] =null;
modsJS[proTalla.MODAL_BOT] =util.createVueFrom({
    el:'#'+proTalla.MODAL_BOT,
    model:[],
    methods:{
        validateForm:proTallaJS.validateModel
    }

});

};





modsJS.getComponent = function(){
    utilGrid.methods.findById = productoJS.findById;
    utilGrid.methods.changeStatus =  productoJS.changeStatus;
        return {
            template:'#grid-template',
              props:    utilGrid.propsDefault,
              data: utilGrid.dataDefault,
              component: utilGrid.component,
              computed: utilGrid.computed,
              filters: utilGrid.filters,
              methods: utilGrid.methods
        }
};

jQuery("#"+producto.FRM_UPLOAD).change(function(e){
    // Creamos el objeto de la clase FileReader
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    modsJS.img.ext = e.target.files[0].type.replace("image/","");
    console.log(reader);
    reader.onload = function(){
       
        modsJS.img.path = reader.result;
    }
    
});