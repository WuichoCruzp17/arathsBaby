

document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

const categoriaJS ={};

categoriaJS.validateModel=function(event){
    const result = util.validateForm(event.target.value, categoria);
    if(result.validate){
        if(result.entity.categoriaId==""){
            categoriaJS.save(result.entity);
        }else{
            categoriaJS.update(result.entity);
        }
        
    }
};

categoriaJS.limpiar = function(){
    const form = document.getElementById(categoria.FRM_NAME_ID);
    form.reset();
};

categoriaJS.save=async function(model){
    const result = await utilXHTTP.post("categorias/save",model);
    if(result.successful){
        messageJS.showMessage("Procedimiento exitoso","Se ha  guardado la nueva categoría","success");
        categoriaJS.findAll();
        categoriaJS.limpiar();
    }else{
        messageJS.showMessage('Error en el servior','Ups, hubo un problema en el servidor, vuelva a intentarlo o vuelva mas tarde','error');
    }
};

categoriaJS.update = async function(model){
    const result = await utilXHTTP.post('categorias/update/',model);
    if(result.successful){
        messageJS.showMessage('Procedimiento exitoso',"Se ha actualizado la información");
        categoriaJS.findAll();
        categoriaJS.limpiar();
    }else{
        messageJS.showMessage('Error en el servior','Ups, hubo un problema en el servidor, vuelva a intentarlo o vuelva mas tarde','error');
    }
};

categoriaJS.changeStatus = async function(categoriaId){
    var model ={};
    for(var i =0;i<modsJS.grid.gridData.length;i++){
        if(modsJS.grid.gridData[i].categoriaId == categoriaId){
            model = modsJS.grid.gridData[i];
        }
    }
    categoriaJS.updateStatus(model);
};

categoriaJS.updateStatus = async function(model){

    const result = await utilXHTTP.post('categorias/updateStatus', model);
    if(result.successful){
        messageJS.showMessage('Procedimiento exitoso',"Se ha actualizado la información");
        categoriaJS.findAll();
        categoriaJS.limpiar();
    }else{
        messageJS.showMessage('Error en el servior','Ups, hubo un problema en el servidor, vuelva a intentarlo o vuelva mas tarde','error')
    }
}

categoriaJS.findById = async function(id){
    const result = await utilXHTTP.get('categorias/findById/'+id);
    if(result.successful){
        util.updateFrom(modsJS[categoria.FRM_NAME_ID], result.categoria);
    }
};

categoriaJS.findAll = async function(){
    const result = await utilXHTTP.get('categorias/findAll');
    console.log(result);
    if(result.successful){
        modsJS.grid._data.gridData =[];
        modsJS.grid._data.gridData =result.categorias;
    }
};

const modsJS ={};


modsJS.ini =function(){

    modsJS[categoria.FRM_NAME] =null;
    const data_frm_supp ={};
    data_frm_supp[categoria.FRM_ID] ='';
    data_frm_supp[categoria.FRM_NAME] ="";
    data_frm_supp[categoria.FRM_DESC] ='';
    modsJS[categoria.FRM_NAME_ID] =util.createVueFrom({
        el:'#'+categoria.FRM_NAME_ID,
        model:data_frm_supp,
        methods:{
            validateSupplier:categoriaJS.validateModel,
            limpiar:categoriaJS.limpiar
        }
    });

    modsJS.grid = utilGrid.createGrid({
        script:'#grid-template',
        element:'#demo',
        grid:'demo-grid',
        columns:[
            {name:'Nombre', column:'nombre'},{name:'descripcion', column:'descripcion'},{name:'', column:''}
        ],
        data:[],
        component:modsJS.getComponent()
    });

    categoriaJS.findAll();

};

modsJS.getComponent = function(){
    utilGrid.methods.findById = categoriaJS.findById;
    utilGrid.methods.changeStatus =  categoriaJS.changeStatus;
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