// --------------- Utilidades para leer y escribir en el localStorage -------------

export const cargarCarritoDeLocalStorage = () => {
    try {
        const data = localStorage.getItem("contenido_carrito_de_compras");
        console.log("Cargando carrito desde localStorage:", data); // Depuración
        return data ? JSON.parse(data) : []; // Devuelve un array vacío si no hay datos
    } catch (error) {
        console.error("Error al cargar desde localStorage:", error);
        return []; // Devuelve un array vacío en caso de error
    }
};

export const guardarCarritoEnLocalStorage = (contenidoCarrito) => {
    try {
        localStorage.setItem("contenido_carrito_de_compras", JSON.stringify(contenidoCarrito));
        console.log("Carrito guardado en localStorage:", contenidoCarrito); // Depuración
    } catch (error) {
        console.error("Error al guardar en localStorage:", error);
    }
};

// --------------- Utilidades para contar productos en carrito y mostrar total en HTML -------------

// Suma la cantidad de cada producto en el carrito
export const calcularProductosCarrito = (arrayCarrito) => {
    if (arrayCarrito) {
        if (arrayCarrito.length > 0) {
            const cantidadCadaProducto = arrayCarrito.map((producto) => producto.cantidad);
            const cantidadProductosCarrito = cantidadCadaProducto.reduce((total, cantidad) => total + cantidad, 0); // Arreglado: Se añade valor inicial 0
            return cantidadProductosCarrito;
        } else {
            return 0; // Está vacío
        }
    } else {
        return 0; // No hay carrito
    }
};

// Actualiza el HTML para mostrar la cantidad de productos
export const actualizarNumeroProductosCarrito = (elemento, arrayCarrito) => {
    const cantidadProductos = calcularProductosCarrito(arrayCarrito);
    elemento.textContent = cantidadProductos; // Asigna el número calculado al elemento
    console.log("Actualizado número de productos en el carrito:", cantidadProductos); // Depuración
};
