const comerciales = [
  "Carmen Gómez",
  "Lucía Gil",
  "Andrés Martínez",
  "Antonio Salinas",
];

const clientes = [
  [
    "Alimentación Daniel",
    "Cash El Puerto",
    "Ultramarinos Claudia",
    "Supermercado Nazareno",
    "Alimentación Guzmán",
    "Supermercado Superprecio",
    "Kiosko La Espera",
    "M&B Alimentación",
    "Ultramarinos Vistabella",
  ],
  [
    "Ultramarinos La Delicia",
    "Supermercado La Esquinita",
    "Alimentación Gómez",
    "Supermercado El Veloz",
    "Kiosko 24h Desavío",
    "Tienda La Manchega",
    "Ultramarinos Tajo",
    "Alimentación Víctor",
  ],
  [
    "Alimentación Millán",
    "Supermercado La Guinda",
    "Kiosko Callejón",
    "Tienda Cantero",
    "Ultramarinos Mérida",
    "Alimentación Moreno",
    "Cash El Hostelero",
  ],
  [
    "Kiosko La Lumbre",
    "Tienda Abad",
    "Ultramarinos Hernández",
    "Alimentación Cervantes",
    "Cash El Panal",
    "CyR Alimentación",
    "Supermercado Los Mosqueteros",
    "Alimentación Carpanta",
    "Supermercado El Percebe",
  ],
];
const categorias = ["Aceite", "Encurtidos", "Salsas"];

const catalogo = new Catalogo();
const gestor = new Gestor();

function cargaDatosIniciales() {
  catalogo.addProducto(1, "Aceite Oliva Virgen Extra 1l (Caja 20)", 178.15, 0);
  catalogo.addProducto(
    2,
    "Aceite Oliva Virgen Extra 700ml (Caja 30)",
    208.5,
    0
  );
  catalogo.addProducto(3, "Aceite Oliva Virgen Extra 5l (Caja 6)", 247.5, 0);
  catalogo.addProducto(4, "Aceite Oliva 1l (Caja 20)", 109.25, 0);
  catalogo.addProducto(5, "Aceituna Gordal 340gr (Caja de 50)", 180.75, 1);
  catalogo.addProducto(
    6,
    "Aceituna Gordal deshuesada 350gr (Caja de 50)",
    205.45,
    1
  );
  catalogo.addProducto(7, "Aceituna Manzanilla 250 gr (Caja de 50)", 124.85, 1);
  catalogo.addProducto(
    8,
    "Aceituna Manzanilla deshuesada 250 gr (Caja de 50)",
    141.35,
    1
  );
  catalogo.addProducto(9, "Aceituna Negra 350gr (Caja de 50)", 87.5, 1);
  catalogo.addProducto(
    10,
    "Aceituna Negra deshuesada 350gr (Caja de 50)",
    99.35,
    1
  );
  catalogo.addProducto(11, "Mayonesa 350gr (Caja de 50)", 124.45, 2);
  catalogo.addProducto(12, "Mayonesa 1Kg (Caja de 30)", 178.65, 2);
  catalogo.addProducto(13, "Salsa Cocktail 350gr (Caja de 50)", 99.65, 2);
  catalogo.addProducto(14, "Salsa Gaucha 350gr (Caja de 50)", 124.85, 2);
  catalogo.addProducto(15, "Salsa Alioli 350 gr (Caja de 50)", 113.75, 2);
  catalogo.addProducto(16, "Salsa Barbacoa 500gr (Caja de 30)", 67.5, 2);
}

//CONSTANTES QUE NECESITO
const selectComercial = document.getElementsByName('comerciales')[0];
const containerDelegacion = document.createElement('div');
containerDelegacion.classList = 'containerDelegacion';

const containerPedido = document.getElementById('pedido');
const tituloPedido = document.createElement('H1');
tituloPedido.textContent = 'Pedido'
containerPedido.append(tituloPedido)

const h2 = document.createElement('H2');
const selectCategoria = document.getElementsByName('categorias')[0];
const selectProductos = document.getElementsByName('productos')[0];

const teclado = document.getElementById('teclado');





//Ejecución de las funciones, para el flujo del programa
cargaDatosIniciales()
cargarClientes();
estadoCliente()
cargarClientesDOM();
cargarCategorias();
cargarProductos();


function cargarClientes() {

  //Añadir los comerciales al gestor
  for (const comercial of comerciales) {
    gestor.comerciales.push(comercial);
  };
  //Añadir comerciales al select de comercial
  for (const comercial of gestor.comerciales) {
    const option = document.createElement('option');
    option.value = comercial;
    option.textContent = comercial;
    selectComercial.append(option);
  };
}


//Conseguir los clientes de cada comercial y añadirlos en DOM
selectComercial.addEventListener('change', estadoCliente)

function estadoCliente() {
  //Conseguir el comercial actual
  gestor.comercialActual = selectComercial.selectedIndex;
  //Conseguir los clientes de ese comercial
  for (const cliente of clientes[gestor.comercialActual]) {
    gestor.clientes.push(new Cliente(false, cliente))
  }
  cargarClientesDOM();
  
};

function cargarClientesDOM() {
  
  //Recorrer todo el contenedor borrando todos los hijos para actualizar
  
  for (const elemento of [...containerDelegacion.children]) {
    elemento.remove();
  }
  
  const contenedorPanel = document.getElementById('clientes');
  contenedorPanel.append(containerDelegacion);
  
  //Crear los div donde van los clientes con sus estilos
  for (const cliente of gestor.clientes) {
    const divCliente = document.createElement('div');
    if (cliente.cuentaAbierta == true) {
      divCliente.classList.add('pendiente');
    } else {
      divCliente.classList.add('pagado');
    }
      divCliente.classList.add('cliente');
      divCliente.textContent = cliente.toString();
    containerDelegacion.append(divCliente)
  }
  gestor.clientes = [];
  
  //Manejador de eventos anonimo para poder ver en que div se ha pulsado y ponerlo en el container de pedidos
  containerDelegacion.addEventListener('click', (event) => {

    
    if(event.target.tagName == 'DIV') {
      gestor.clienteActual = new Cliente(false, event.target.textContent)
      h2.textContent = event.target.textContent;
      containerPedido.append(h2);
    };
  });


}

function cargarCategorias() {
  //Tener en el getor las categorias
  for (const categoria of categorias) {
      gestor.categorias.push(categoria);
  }

  //Introducir visualmente en el DOM 
  for (const categoria of gestor.categorias) {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    
    selectCategoria.append(option);
  }
}

selectCategoria.addEventListener('change', cargarProductos)


function cargarProductos() {  

  for (const producto of [...selectProductos.children]) {
      producto.remove()
  }

  catalogo.productos.forEach(producto => {
    if (selectCategoria.selectedIndex == producto.idCategoria) {
      const option = document.createElement('option');
      option.textContent = producto.nombreProducto;
      option.value = producto.idProducto;
      selectProductos.append(option);

    }
  });
}

teclado.addEventListener('click', cambiarEstadoCliente)

function cambiarEstadoCliente(event) {
  if(event.target.tagName == 'INPUT') {
    for (const cliente of [...containerDelegacion.children]) {
      if (cliente.textContent == gestor.clienteActual.nombre) {
        cliente.classList.remove('pagado');
        cliente.classList.add('pendiente');
      }
    }
  }

}


