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
const contenedorPanel = document.getElementById('clientes');
contenedorPanel.append(containerDelegacion);

//Ejecución de las funciones, para el flujo del programa
cargaDatosIniciales()
cargarClientes();
estadoCliente()
cargarCategorias();
cargarProductos();

function cargarClientes() {
  gestor.comerciales = comerciales;
  selectComercial.innerHTML = ""; 
  
  for (let i = 0; i < gestor.comerciales.length; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = gestor.comerciales[i];
    selectComercial.append(option);
  }

  for (let i = 0; i < clientes.length; i++) {
    
    gestor.clientes[i] = []; 
    gestor.pedidos[i] = [];  

    for (let j = 0; j < clientes[i].length; j++) {
      gestor.clientes[i][j] = new Cliente(false, clientes[i][j]);
      gestor.pedidos[i][j] = []; 
    }
  }
}

//Conseguir los clientes de cada comercial y añadirlos en DOM
selectComercial.addEventListener('change', estadoCliente)

function estadoCliente() {
  gestor.comercialActual = selectComercial.selectedIndex;
  gestor.clienteActual = null;
  
  for (const elemento of [...containerPedido.children]) {
    if(elemento.tagName !== 'H1') {
      elemento.remove();
    }
  }
  
  cargarClientesDOM();
}
function cargarClientesDOM() {
  containerDelegacion.innerHTML = "";
  const listaClientes = gestor.clientes[gestor.comercialActual];
  
  listaClientes.forEach((cliente, index) => {
    const div = document.createElement('div');
    div.classList.add('cliente');
    
    if (cliente.cuentaAbierta) {
      div.classList.add('pendiente');
    } else {
      div.classList.add('pagado');
    }

    div.textContent = cliente.nombre;

    containerDelegacion.append(div);
  });
}

containerDelegacion.addEventListener('click', (event) => {

if (event.target.classList.contains('cliente')) {
    
    const nombrePulsado = event.target.textContent;
    const clientesDelComercial = gestor.clientes[gestor.comercialActual];
    const indiceEncontrado = clientesDelComercial.findIndex(c => c.nombre == nombrePulsado);

    if (indiceEncontrado != -1) {
        gestor.clienteActual = indiceEncontrado; 
        actualizarPanelPedido();
    }
  }
});

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

teclado.addEventListener('click', (event) => {
  if (event.target.tagName === 'INPUT') {
    const cantidad = parseInt(event.target.value);
    aniadirProducto(cantidad);
  }
    actualizarPanelPedido();
});

function aniadirProducto(unidades) {
  if (gestor.clienteActual === null || gestor.comercialActual === null) {
      return;
  }

  const idProd = parseInt(selectProductos.value);
  
  const misPedidos = gestor.pedidos[gestor.comercialActual][gestor.clienteActual];
  const lineaExistente = misPedidos.find(l => l.idProducto == idProd);

  if (lineaExistente) {
    alert("Ya existe este producto en el pedido, si quiere modficar la cantidad utilice los controles de la cuenta");
    return; 
  } else {
    misPedidos.push(new LineaPedido(unidades, idProd));
    gestor.clientes[gestor.comercialActual][gestor.clienteActual].cuentaAbierta = true;
    cargarClientesDOM();     
    actualizarPanelPedido();
  }
}

function actualizarPanelPedido() {
  //Actualizar con la informacion del pedido del cliente
  for (const elemento of [...containerPedido.children]) {
    if(elemento.tagName != 'H1') {
      elemento.remove()
    }
  }
  
  if (gestor.clienteActual === null || gestor.comercialActual === null) {
    return;
  } 

  const cliente = gestor.clientes[gestor.comercialActual][gestor.clienteActual];
  const pedidosArray = gestor.pedidos[gestor.comercialActual][gestor.clienteActual];

  const h2 = document.createElement('h2');
  h2.textContent = `Cliente ${cliente.nombre}`; 
  containerPedido.append(h2);

  if (cliente.cuentaAbierta === false) {
      return; 
  }

  let total = 0;
  pedidosArray.forEach(linea => {
    const producto = catalogo.productos.find(p => p.idProducto == linea.idProducto);
    if (producto) {
      total += linea.unidades * producto.precioUnidad;
    }
  });

  const totalH2 = document.createElement('h2');
  totalH2.textContent = `TOTAL: ${total.toFixed(2)}€`; 
  containerPedido.append(totalH2);

  const divEstado = document.createElement('div');
  divEstado.classList.add('boton');

  if (cliente.cuentaAbierta) {
    divEstado.textContent = "PEDIDO ENVIADO Y COBRADO";


    divEstado.onclick = () => {

            let usuario = confirm('¿Estás seguro que quieres dar por finalizado este pedido?')
            if(usuario) {
              gestor.pedidos[gestor.comercialActual][gestor.clienteActual] = []; 
              cliente.cuentaAbierta = false; 
                for (const elemento of [...containerPedido.children]) {
                  if(elemento.tagName != 'H1') {
                    elemento.remove()
                  }
               }
              cargarClientesDOM(); 
              gestor.clienteActual = null; 
            }
        };
  }

  containerPedido.append(divEstado);

  //CREACION DE TABLA DE PEDIDOS DEL CLIENTE
  const tabla = document.createElement('table');
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Modificar</th>
      <th>Uds.</th>
      <th>Id.</th>
      <th>Producto</th>
      <th>Precio</th>
    </tr>
  `;
  tabla.append(thead);

  const tbody = document.createElement('tbody');

  pedidosArray.forEach((linea, indexLinea) => {
    const producto = catalogo.productos.find(p => p.idProducto == linea.idProducto);

    if (!producto) {
      return;
    } 
    
    const tr = document.createElement('tr');

    const tdModificar = document.createElement('td');
    
    const btnMas = document.createElement('input'); 
    btnMas.type = "button";
    btnMas.value = "+";
    btnMas.className = "modificador"; 
    btnMas.onclick = () => modificarLinea(indexLinea, 1); 

    const btnMenos = document.createElement('input');
    btnMenos.type = "button";
    btnMenos.value = "-";
    btnMenos.className = "modificador"; 
    btnMenos.onclick = () => modificarLinea(indexLinea, -1); 

    tdModificar.append(btnMas, btnMenos);

    const tdUds = document.createElement('td');
    tdUds.textContent = linea.unidades;

    const tdId = document.createElement('td');
    tdId.textContent = producto.idProducto;

    const tdProducto = document.createElement('td');
    tdProducto.textContent = `${producto.nombreProducto} (ud: ${producto.precioUnidad.toFixed(2)}€)`;

    const tdPrecio = document.createElement('td');
    const precioTotalLinea = linea.unidades * producto.precioUnidad;
    tdPrecio.textContent = precioTotalLinea.toFixed(2); 

    tr.append(tdModificar, tdUds, tdId, tdProducto, tdPrecio);
    tbody.append(tr);
  });

  tabla.append(tbody);
  containerPedido.append(tabla);
}

//Permite sumar y restar unidades en las diferentes lineas de pedidos
function modificarLinea(indexLinea, cantidad) {
  let misPedidos = gestor.pedidos[gestor.comercialActual][gestor.clienteActual];
  const linea = misPedidos[indexLinea];
  linea.unidades += cantidad;

  if (linea.unidades <= 0) {
    let usuario = confirm('¿Está seguro que quiere eliminar este producto del pedido?');

    if (usuario) {
          misPedidos = misPedidos.filter((linea, i) => i != indexLinea);
          gestor.pedidos[gestor.comercialActual][gestor.clienteActual] = misPedidos;    
    } 
  }
  actualizarPanelPedido();
}