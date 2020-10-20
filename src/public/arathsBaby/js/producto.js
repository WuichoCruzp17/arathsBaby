

document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

const productoJS ={};

productoJS.validateModel=function(event){
    const result = util.validateForm(event.target.value, producto);
    if(result.validate){
        if(result.entity.productoId==""){
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
    const result = await utilXHTTP.post("productos/save",model);
    if(result.successful){
        messageJS.showMessage("Procedimiento exitoso","Se ha  guardado el nuevo producto","success");
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
        {name:'Nombre', column:'nombre'},{name:'Descripcion', column:'descripcion'},{name:'', column:''}
    ],
    data:[],
    show:false,
    component:modsJS.getComponent()
});

modsJS[producto.FRM_NAME_ID] =null;
const data_frm_supp ={};
data_frm_supp[producto.FRM_ID] ='';
data_frm_supp[producto.FRM_NAME] ="";
data_frm_supp[producto.FRM_DESC] ='';
data_frm_supp[producto.FRM_CANT] ='';
data_frm_supp[producto.FRM_PRECIO] ='';
data_frm_supp[producto.FRM_UPLOAD] ='';
data_frm_supp[producto.FRM_CATEGORIA] ='0';
data_frm_supp[producto.FRM_PROV] ='0';
data_frm_supp[producto.FRM_DESCONT] =false;
data_frm_supp[producto.FRM_PROTALLA] =false;

modsJS[producto.FRM_NAME_ID] =util.createVueFrom({
    el:'#'+producto.FRM_NAME_ID,
    model:data_frm_supp,
    methods:{
        validateSupplier:productoJS.validateModel,
        limpiar:productoJS.limpiar,
        onChangeFile:modsJS.onChangeFile,
        onChangeFileTalla:function($event){
            modsJS.grid.show= modsJS[producto.FRM_NAME_ID][producto.FRM_PROTALLA];
        }
    }

});

};

const proTallaJS ={};

proTallaJS.setModel =function(){
    Swal.mixin({
        input: 'text',
        required:'required',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        buttonsStyling: false,
        progressSteps: ['1', '2']
      }).queue([
        {
          title: 'Nombre',
          text: '',
          required:'required',
        },
        'Descripcion'
      ]).then((result) => {
        if (result.value) {
          const answers = JSON.stringify(result.value)
          Swal.fire({
            title: 'All done!',
            html: `
              Your answers:
              <pre><code>${answers}</code></pre>
            `,
            confirmButtonText: 'Lovely!'
          })
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