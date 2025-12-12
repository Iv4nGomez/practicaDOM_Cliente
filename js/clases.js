class Producto{

    _idProducto;
    _nombreProducto;
    _precioUnidad;
    _idCategoria;

    get idProducto() {
        return this._idProducto;
    }
    set idProducto(value) {
        this._idProducto = value;
    }
    get nombreProducto() {
        return this._nombreProducto;
    }
    set nombreProducto(value) {
        this._nombreProducto = value;
    }
    get precioUnidad() {
        return this._precioUnidad;
    }
    set precioUnidad(value) {
        this._precioUnidad = value;
    }
    get idCategoria() {
        return this._idCategoria;
    }
    set idCategoria(value) {
        this._idCategoria = value;
    }

    constructor(idProducto, nombreProducto, precioUnidad, idCategoria) {
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.precioUnidad = precioUnidad;
        this.idCategoria = idCategoria; 
    }
}

class Catalogo{
    _productos;
    
    get productos() {
        return this._productos;
    }
    set productos(value) {
        this._productos = value;
    }

    constructor() {
        this.productos = [];
    }

    addProducto(idProducto, nombreProducto, precioUnidad, idCategoria) {
        this.productos.push(new Producto(idProducto, nombreProducto, precioUnidad, idCategoria));
    }
}

class LineaPedido{
    _unidades;
    _idProducto;

    get idProducto() {
        return this._idProducto;
    }
    set idProducto(value) {
        this._idProducto = value;
    }
    
    get unidades() {
        return this._unidades;
    }
    set unidades(value) {
        this._unidades = value;
    }
}

class Cliente {
    _nombre;
    _cuentaAbierta;

    get cuentaAbierta() {
        return this._cuentaAbierta;
    }
    set cuentaAbierta(value) {
        this._cuentaAbierta = value;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(value) {
        this._nombre = value;
    }
}

class Gestor {
    _categorias;
    _comerciales;
    _clientes;
    _comercialActual;
    _clienteActual;
    _pedidos;

    get categorias() {
        return this._categorias;
    }
    set categorias(value) {
        this._categorias = value;
    }
    get comerciales() {
        return this._comerciales;
    }
    set comerciales(value) {
        this._comerciales = value;
    }
    get clientes() {
        return this._clientes;
    }
    set clientes(value) {
        this._clientes = value;
    }
    get comercialActual() {
        return this._comercialActual;
    }
    set comercialActual(value) {
        this._comercialActual = value;
    }
    get clienteActual() {
        return this._clienteActual;
    }
    set clienteActual(value) {
        this._clienteActual = value;
    }
    get pedidos() {
        return this._pedidos;
    }
    set pedidos(value) {
        this._pedidos = value;
    }
}