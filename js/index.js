import {
    generarHTMLProductos,
    obtenerCategorias,
    poblarSelectorCategorias
} from "./uCargaDinamica.js";

import {
    guardarCarritoEnLocalStorage,
    cargarCarritoDeLocalStorage,
    actualizarNumeroProductosCarrito
} from "./uCarrito.js";

// Capturar elementos HTML
const contenedorProductos = document.getElementById("contenedor-productos");
const selectorCategorias = document.getElementById("selector-categorias");
const numeroCarrito = document.getElementById("numero-carrito");

// URL de la API de cócteles
const URL_API = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=d";

// Función para obtener los datos de la API
async function traerDatosAPI() {
    try {
        const respuestaAPI = await fetch(URL_API);
        const datos = await respuestaAPI.json();
        return datos.drinks || [];
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        return [];
    }
}

const productos = await traerDatosAPI();

// Adaptar las categorías para cócteles
function obtenerCategoriasDeCocteles(productos) {
    const categorias = new Set(productos.map((producto) => producto.strCategory));
    return ["todos", ...categorias];
}

// Generar HTML para los productos
function generarHTMLProductosCocteles(productos, contenedor) {
    contenedor.innerHTML = "";
    productos.forEach((producto) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-producto");

        tarjeta.innerHTML = `
            <img src="${producto.strDrinkThumb}" alt="${producto.strDrink}">
            <h3>${producto.strDrink}</h3>
            <p>${producto.strCategory || "Sin categoría"}</p>
            <button class="tarjeta-producto-agregar" id="${producto.idDrink}">Agregar al carrito</button>
        `;

        contenedor.appendChild(tarjeta);
    });
}

// Poblar el selector de categorías
poblarSelectorCategorias(selectorCategorias, obtenerCategoriasDeCocteles(productos));

// Generar los productos dinámicamente
generarHTMLProductosCocteles(productos, contenedorProductos);
prepararBotonesAgregarCarrito();

let contenidoCarritoCompras = cargarCarritoDeLocalStorage();
let carritoCompras = contenidoCarritoCompras || [];

// Preparar botones para agregar al carrito
export function prepararBotonesAgregarCarrito() {
    const botonesAgregarAlCarrito = document.querySelectorAll(".tarjeta-producto-agregar");
    botonesAgregarAlCarrito.forEach((boton) => boton.addEventListener("click", agregarProductoAlCarrito));
}

function agregarProductoAlCarrito(e) {
    const id = e.target.id;
    const producto = productos.find((producto) => producto.idDrink === id);

    if (carritoCompras.some((item) => item.idDrink === producto.idDrink)) {
        const index = carritoCompras.findIndex((item) => item.idDrink === producto.idDrink);
        carritoCompras[index].cantidad += 1;
    } else {
        producto.cantidad = 1;
        carritoCompras.push(producto);
    }

    actualizarNumeroProductosCarrito(numeroCarrito, carritoCompras);
    guardarCarritoEnLocalStorage(carritoCompras);
}

// Filtrar productos por categoría
function filtrarProductosPorCategoria(categoria) {
    if (categoria === "todos") {
        return productos;
    }
    return productos.filter((producto) => producto.strCategory === categoria);
}

// Mostrar productos por categoría
function mostrarProductosPorCategoria(e) {
    const categoria = e.target.value;
    const productosFiltrados = filtrarProductosPorCategoria(categoria);
    generarHTMLProductosCocteles(productosFiltrados, contenedorProductos);
    prepararBotonesAgregarCarrito();
}

// Event listener para el selector de categorías
selectorCategorias.addEventListener("change", mostrarProductosPorCategoria);
