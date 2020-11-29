document.addEventListener("DOMContentLoaded", function (event) {
    modsJS.ini();
});

const modsJS ={};
modsJS.ini = function(){

    modsJS.gridPedidos = utilGrid.createGrid({
        script:'#grid-pedido',
        grid:'pedido-grid',
        element:'#divPedidos',
        columns:[
            {name:'Folio', column:'folio'},
            {name:'Nombre', column:'nombre'},
            {name:'Ciudad', column:'descripcion'},
            {name:'Direccion', column:'direccion'},
            {name:'Correo', column:'correo'},
            {name:'Costo Envio',column:'costoEnvio'},
            {name:'',column:''}
        ],
        data:[],
        show:false,
        component:modsJS.getComponent()
    })
    pedidoJS.findAll();
}

const pedidoJS ={};

pedidoJS.findById = async function(){

}
pedidoJS.changeStatus = async function(){

}
pedidoJS.findAll = async function(){
    const result = await utilXHTTP.get('pedidos/findAll');
    console.log(result);
    if(result.successful){
        modsJS.gridPedidos._data.gridData =[];
        modsJS.gridPedidos._data.gridData =result.pedidos;
    }
}

modsJS.getComponent = function(){
    utilGrid.methods.findById = pedidoJS.pedidoJS;
    utilGrid.methods.changeStatus =  pedidoJS.changeStatus;
        return {
            template:'#grid-pedido',
              props:    utilGrid.propsDefault,
              data: utilGrid.dataDefault,
              component: utilGrid.component,
              computed: utilGrid.computed,
              filters: utilGrid.filters,
              methods: utilGrid.methods
        }
};

