

document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

const proveedorJS ={};

proveedorJS.validateModel=function(event){
    const result = util.validateForm(event.target.value, proveedor);
    if(result.validate){
        if(result.entity.proveedorId==""){
            proveedorJS.save(result.entity);
        }else{
            proveedorJS.update(result.entity);
        }
        
    }
};

proveedorJS.limpiar = function(){
    const form = document.getElementById(proveedor.FRM_NAME_ID);
    form.reset();
};

proveedorJS.save=async function(model){
    const result = await utilXHTTP.post("proveedores/save",model);
    if(result.successful){
        messageJS.showMessage("Procedimiento exitoso","Se ha  guardado el nuevo proveedor","success");
        proveedorJS.findAll();
        proveedorJS.limpiar();
    }else{
        messageJS.showMessage('Error en el servior','Ups, hubo un problema en el servidor, vuelva a intentarlo o vuelva mas tarde','error');
    }
};

proveedorJS.update = async function(model){
    const result = await utilXHTTP.post('proveedores/update/',model);
    if(result.successful){
        messageJS.showMessage('Procedimiento exitoso',"Se ha actualizado la información");
        proveedorJS.findAll();
        proveedorJS.limpiar();
    }else{
        messageJS.showMessage('Error en el servior','Ups, hubo un problema en el servidor, vuelva a intentarlo o vuelva mas tarde','error');
    }
};

proveedorJS.changeStatus = async function(proveedorId){
    var model ={};
    for(var i =0;i<modsJS.grid.gridData.length;i++){
        if(modsJS.grid.gridData[i].proveedorId == proveedorId){
            model = modsJS.grid.gridData[i];
        }
    }
    model[proveedor.FRM_ESTATUS] = (proveedor.FRM_ESTATUS) ? false:true;
    proveedorJS.updateStatus(model);
};

proveedorJS.updateStatus = async function(model){

    const result = await utilXHTTP.post('proveedores/updateStatus', model);
    if(result.successful){
        messageJS.showMessage('Procedimiento exitoso',"Se ha actualizado la información");
        proveedorJS.findAll();
        proveedorJS.limpiar();
    }else{
        messageJS.showMessage('Error en el servior','Ups, hubo un problema en el servidor, vuelva a intentarlo o vuelva mas tarde','error')
    }
}

proveedorJS.findById = async function(id){
    const result = await utilXHTTP.get('proveedores/findById/'+id);
    if(result.successful){
        util.updateFrom(modsJS[proveedor.FRM_NAME_ID], result.proveedor);
    }
};

proveedorJS.findAll = async function(){
    const result = await utilXHTTP.get('proveedores/findAll');
    console.log(result);
    if(result.successful){
        modsJS.grid._data.gridData =[];
        modsJS.grid._data.gridData =result.proveedores;
    }
};

const modsJS ={};


modsJS.ini =function(){

    modsJS[proveedor.frm_name] =null;
    const data_frm_supp ={};
    data_frm_supp[proveedor.FRM_ID] ='';
    data_frm_supp[proveedor.FRM_NAME] ="";
    data_frm_supp[proveedor.FRM_RFC] ='';
    data_frm_supp[proveedor.FRM_RZS] ='';
    data_frm_supp[proveedor.FRM_TELE] ='';
    data_frm_supp[proveedor.FRM_EMAIL] ='';
    data_frm_supp[proveedor.FRM_PHONE] ='';
    modsJS[proveedor.FRM_NAME_ID] =util.createVueFrom({
        el:'#'+proveedor.FRM_NAME_ID,
        model:data_frm_supp,
        methods:{
            validateSupplier:proveedorJS.validateModel,
            limpiar:proveedorJS.limpiar
        }
    });

    modsJS.grid = utilGrid.createGrid({
        script:'#grid-template',
        element:'#demo',
        columns:[
            {name:'Nombre', column:'nombre'},{name:'RFC', column:'rfc'}, {name:'Contacto', column:'correo'},{name:'', column:''}
        ],
        data:[],
        component:modsJS.getComponent()
    });

    proveedorJS.findAll();

};

modsJS.getComponent = function(){
    utilGrid.methods.findById = proveedorJS.findById;
    utilGrid.methods.changeStatus =  proveedorJS.changeStatus;
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