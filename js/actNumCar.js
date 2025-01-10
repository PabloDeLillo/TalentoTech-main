//Este script se usa en todas las páginas con el solo fin de actualizar el número de productos en el carrito del nav

import {
    cargarCarritoDeLocalStorage,
    actualizarNumeroProductosCarrito
} from "./utilidadesCarrito.js"

const spanNumeroCarrito = document.querySelector("#numero-carrito")

let contenidoCarrito = cargarCarritoDeLocalStorage();

//A ver si hay algo en el carrito

actualizarNumeroProductosCarrito(spanNumeroCarrito,contenidoCarrito)