document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
    jQuery("#contraerTabla").click(function(e){
        // Creamos el objeto de la clase FileReader
        jQuery("#contenedorTablaProducto").slideToggle( "slow" );
        
    })
    
});

const clienteJS ={};

clienteJS.findById =function(){};
clienteJS.changeStatus =function(){};
clienteJS.findAll =async function(){
    const result = await utilXHTTP.get('clientes/findAll');
    console.log(result);
    if(result.successful){
        modsJS.gridCliente._data.gridData =[];
        modsJS.gridCliente._data.gridData =result.clientes;
    }
}
const modsJS ={};

modsJS.img ={};

modsJS.ini =function(){

    
   modsJS.gridCliente = utilGrid.createGrid({
    script:'#grid-cliente',
    grid:'cliente-grid',
    element:'#divProductos',
    columns:[
        {name:'Nombre', column:'nombre'},{name:'Correo', column:'correo'},{name:'', column:''}
    ],
    data:[],
    show:false,
    component:modsJS.getComponent()
});

clienteJS.findAll();
}



modsJS.getComponent = function(){
    utilGrid.methods.findById = clienteJS.findById;
    utilGrid.methods.changeStatus =  clienteJS.changeStatus;
        return {
            template:'#grid-cliente',
              props:    utilGrid.propsDefault,
              data: utilGrid.dataDefault,
              component: utilGrid.component,
              computed: utilGrid.computed,
              filters: utilGrid.filters,
              methods: utilGrid.methods
        }
};
