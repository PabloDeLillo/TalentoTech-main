
//Para el index.html

// Lee la array de datos de los productos y genera elementos HTML dinamicamente
export function generarHTMLProductos(datos,contenedorProductos){
    //Vaciar el contenedor de productos
    contenedorProductos.innerHTML="";
    return(
        contenedorProductos.innerHTML = datos.map((producto)=>{
            let {id, title, description, image} = producto;
            const price = 1; // Precio fijo
            return `
                <article class="tarjeta-producto">
                        <div class="tarjeta-producto-imagen">
                            <img src=${image} alt="${title}">
                        </div>

                        <div class="tarjeta-producto-info">
                            <h3>${title}</h3>
                            <p>${description}</p>
                            <p>$ ${price}</p>
                            <button  class="tarjeta-producto-agregar" id="${id}">Agregar al carrito</button>
                            
                        </div>

                    </article>
                `

        }).join("")

    )
}


// Funciones para poblar dinamicamente el select para filtar productos por categoria
//=====================================================================================

export function obtenerCategorias(arrayProductos){
    //En un set no hay productos repetidos...
    let categoriasApi = new Set(arrayProductos.map((producto)=> producto.category));
    //Pero se necesita devolver una array 
    return [...categoriasApi]
}

export function poblarSelectorCategorias(selectorCategorias,arrayCategorias){
    //Primero agrego una categoría "todos"
    selectorCategorias.options[selectorCategorias.options.length] = new Option('Todos', 'todos');
    //Ahora se cargan las categorias que vinieron de la api
    arrayCategorias.forEach(categoria => {
        //Hay que hacer un capitalize para los textos de las options
        selectorCategorias.options[selectorCategorias.options.length] = new Option(capitalizarPalabra(categoria), categoria);
    });
}


//Funcion auxiliar para convertir palabras con la primera letra en mayuscula porque JS tiene tanto pero no capitalize 
function capitalizarPalabra(palabra){
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}
