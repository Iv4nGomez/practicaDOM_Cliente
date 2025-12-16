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

const formulario = document.getElementById('frmComercial');
const padreFormulario = formulario.parentElement;

const contenedor = document.createElement('div')
contenedor.className = 'contenedorCliente';
padreFormulario.append(contenedor)

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

//Elementos guardardas en constantes que se reutilizan en varias funciones
const select = document.getElementsByName('comerciales')[0];
const teclado =  document.getElementById('teclado');
const containerPedido = document.getElementById('pedido');
const selectProductos = document.getElementsByName('productos')[0];
const selectCategoria = document.getElementsByName('categorias')[0];
//Etructura de datos aux

const pendientePago = [];

//Invocación de funciones para el funcionamiento de la web
cargaDatosIniciales();
cargarComerciales();
generarContenedorClientes();
generarClientes();
crearTituloPedido();
cargarCategorias();
cargarProductos();

//FUNCIONES

function cargarComerciales() {
  
  for (let i = 0; i < comerciales.length; i++) {
    
    const option = document.createElement('option');
  
    option.value = i;
    option.textContent = comerciales[i];
  
    select.append(option);
  }
}

function generarContenedorClientes() {
  const contenedorClientes = document.createElement('div');
  const form = select.parentElement;
  form.parentElement.append(contenedorClientes);
}

select.addEventListener('change', generarClientes);

function generarClientes() {
  
  const divClientes = [...document.querySelectorAll('.cliente')];
  
  divClientes.forEach((elementDiv) => {
    elementDiv.remove();
  })
  const opcionSeleccionada = select.value;

  for (let i = 0; i < clientes[opcionSeleccionada].length; i++) {
    
    const div = document.createElement('div');
    div.classList.add('cliente')
    div.innerHTML = clientes[opcionSeleccionada][i]
    if (pendientePago.includes(clientes[opcionSeleccionada][i])) {
      div.classList.add('pendiente')
    }
    else {
      div.classList.add('pagado')

    }
    contenedor.append(div)
  }
  
}

function crearTituloPedido() {
  const titulo = document.createElement('h1');
  titulo.textContent = 'Pedido'
  containerPedido.append(titulo)
}

//Cambia el cliente seleccionado en el panel de pedido
contenedor.addEventListener('click', (event) => {
  
  [...containerPedido.children].forEach(element => {
    
    if (element.tagName != 'H1') {
      element.remove()
    }
  });
  const cliente = document.createElement('H2');
  const clienteSeleccionado = event.target;
  cliente.textContent = event.target.textContent

  if (cliente) {
    containerPedido.append(cliente);
  }

  console.log(event.target.className);

  if (event.target.className.includes('pendiente')) {
    crearHeader()
  }
})

teclado.addEventListener('click', pintarPendiente)

//Si añade un producto a pedido pues se pone en rojo el div del cliente seleccionado
function pintarPendiente(event) {
  
  
  let clienteTexto = '';
  [...containerPedido.children].forEach(elemento => {
      if(elemento.tagName == 'H2') {
        clienteTexto = elemento.textContent;
      }
    })

    const contenedorCliente = document.getElementsByClassName('contenedorCliente')[0];

    [...contenedorCliente.children].forEach(elemento => {

      if(elemento.textContent == clienteTexto) {
        if (!pendientePago.includes(elemento.textContent)) {
          pendientePago.push(elemento.textContent);
        }
        elemento.classList.remove('pagado')
        elemento.classList.add('pendiente')
      }
    })

    let tablaEncontrada = false;
    Array.from(containerPedido.children).forEach(elemento => {
      if(elemento.tagName == 'TABLE') {
        tablaEncontrada = true;
      }
    })

    if (!tablaEncontrada) {

      crearHeader()
    }

    const producto = selectProductos.value;

    const numeroUnidades = event.target.value;

    if (!event.target.value) {
      return;
    }

    crearTabla(recuperarProducto(producto), numeroUnidades);
}

function cargarCategorias() {

categorias.forEach(element => {
  const option = document.createElement('option');
  option.value = element;
  option.textContent = element;
  selectCategoria.append(option); 
});
}

function cargarProductos() {
  
  const valorCategoria = selectCategoria.selectedIndex;
  for (const producto of catalogo.productos) {
    if (producto.idCategoria == valorCategoria) {
        const option = document.createElement('option');
        option.value = producto.nombreProducto;
        option.textContent = producto.nombreProducto;
        selectProductos.append(option)
    }
  }
}

//Si el usuario cambia de categoria hay que cargar los productos de nuevo
selectCategoria.addEventListener('change', () => {

[...selectProductos.children].forEach(element => {
  element.remove()
});
cargarProductos();
})



function recuperarProducto(productoNombre) {
  return catalogo.productos.find((producto) => productoNombre == producto.nombreProducto)
}

function crearTabla(producto, numeroUnidades) {

  const l1 = new LineaPedido();
  
l1._idProducto = producto.idProducto;
l1.unidades = numeroUnidades;







const table = document.querySelector('#pedido > table');

const tbody = document.createElement('tbody');



table.append(tbody)




const cuerpoTabla = document.querySelector('#pedido > table tbody');
const fila = cuerpoTabla.insertRow()

const celdaModificadores = fila.insertCell()
const celdaUnidades = fila.insertCell()
const celdaIdProducto = fila.insertCell()
const celdaNombreProducto = fila.insertCell()
const celdaPrecioProducto = fila.insertCell()

celdaModificadores.textContent = '';
celdaUnidades.textContent = numeroUnidades;
celdaIdProducto.textContent = producto.idProducto;
celdaNombreProducto.textContent = producto.nombreProducto;
celdaPrecioProducto.textContent = producto.precioUnidad;

console.log(fila);

}

function crearHeader() {
  
  const table = document.createElement('table');
  const columnas = ['Modificar', 'Uds.', 'Id.', 'Producto', 'Precio'];

  const thead = table.createTHead()
  const headerRow = thead.insertRow();

  columnas.forEach(element => {
    const th = document.createElement('th');
    th.textContent = element;
    headerRow.append(th)
  });

  containerPedido.append(table)
}
