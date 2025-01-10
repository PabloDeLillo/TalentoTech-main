import { 
    cargarCarritoDeLocalStorage, 
    guardarCarritoEnLocalStorage,
    calcularProductosCarrito,
    actualizarNumeroProductosCarrito } from "./uCarrito.js"

//El span donde se muestra la cantidad de productos que hay en el carrito de compras en el <nav>
const numeroCarrito = document.getElementById("numero-carrito");

//La sección donde se generan los productos dinámicamente
//const contenedorProductos = document.getElementById("seccion-productos")
const contenedorProductos = document.getElementById("contenedor-productos")


//Prepandando las variables para recibir los botones de aumentar, descontar y eliminar productos
let botonesDescontarCantidad;
let botonesAumentarCantidad;
let botonesEliminarProducto


//1) Leer el localStorage
        //Si hay algo, crear el HTML dinámicamente y actualizar el numero del carrito
        //Si no, mostrar algo tipo "tu carrito está vacío"

//ACA ME PARECE QUE HAY QUE HACER || []
let contenidoCarrito = cargarCarritoDeLocalStorage() || [];

//TEST
console.log("El contentido del carrito es " +  contenidoCarrito);


if(contenidoCarrito.length>0){
    //Actualizar el número en el carrito del nav
    let itemsEnCarrito = calcularProductosCarrito(contenidoCarrito);
    actualizarNumeroProductosCarrito(numeroCarrito,contenidoCarrito);

    //Se genera HTML y se capturan los botones recien creados
    generarContenidoDinamico(contenidoCarrito)


}else{
    //Generar dinamicamente mensaje "tu carrito está vacio 😥"
    displayCarritoVacio()

}

/* FUNCION PARA POBLAR EL CARRITO*/

function poblarCarrito(arrayCarrito){
    //Vaciar la seccion de productos
    contenedorProductos.innerHTML = "";
    return(
        
        contenedorProductos.innerHTML = arrayCarrito.map((producto)=>{
            let {id,title,image,cantidad} = producto;
            const price=1;
            return `
                <article class="producto-carrito">
                        
                    <div class="producto-carrito__miniatura">
                        <img src=${image} alt=${title}>
                    </div>
                    
                    <div class="producto-carrito__nombre">
                        <p>${title}</p>
                    </div>

                    <div class="producto-carrito__precio">
                        <p>Precio unitario</p>
                        <span>$${price}</span>
                    </div>

                    <div class="producto-carrito__cantidad">
                        <p>Cantidad</p>
                        <i class="fa-regular fa-square-minus producto-carrito__descontar-cantidad" data-id-menos=${id}></i>
                        <span data-id-cantidad=${id}>${cantidad}</span>
                        <i class="fa-regular fa-square-plus producto-carrito__aumentar-cantidad" data-id-mas=${id}></i>
                    </div>

                    <div class="producto-carrito__subtotal">
                        <p>Subtotal:</p>
                        <span data-id-subtotal=${id}>${price * cantidad}</span>
                    </div>

                    <div>
                        <i class="fa-regular fa-trash-can producto-carrito__eliminar" data-id-eliminar=${id}></i>
                    </div>

                    </article>
            `
        }).join("")
    )
}

function descontarCantidadProducto(idProductoDescontar){
    let idProducto = idProductoDescontar
    let productoBuscado = contenidoCarrito.find((producto)=>producto.id == idProducto)
    console.log("El producto del que estoy descontando es: " +  productoBuscado.title)

    if(productoBuscado.cantidad > 1){
        productoBuscado.cantidad -=1    //Con esto estoy actualizando el contenido del carrito local

        //Hay que hacer re-render de la cantidad y el subtotal 
        actualizarSpanCantidadYSubtotal(productoBuscado);

        //Actualizar la cantidad de productos en carrito del nav
        let itemsEnCarrito = calcularProductosCarrito(contenidoCarrito);
        actualizarNumeroProductosCarrito(numeroCarrito,contenidoCarrito);

        //Actualizar localStorage
        guardarCarritoEnLocalStorage(contenidoCarrito);

    }else{
        //Que pasa si pongo en cero la cantidad antes de borrarlo?
        productoBuscado.cantidad = 0;

        console.log("Ya no podes descontar mas, hay que borrar el producto del carrito")
        eliminarProductoCarrito(idProducto)
        
        
        //ACA HAY QUE RECALCULAR LA CANTIDAD DE PRODUCTOS DEL CARRITO, SI YA SON CERO HAY QUE GENERAR EL DISPLAY DE TU CARRITO ESTA VACIO !!!!!!!!!!!!!!!!
        if(contenidoCarrito<1){
            //si ya no queda mas nada en el carrito NO VALE TRATAR DE CONTAR PRODUCTOS EN UN CARRO VACIO !!
            displayCarritoVacio()
        }
        
    }

}


function aumentarCantidadProducto(idProducto){
    let productoBuscado = contenidoCarrito.find((producto)=>producto.id == idProducto);

    productoBuscado.cantidad+=1;
    //Hay que hacer re-render de la cantidad y el subtotal 
    actualizarSpanCantidadYSubtotal(productoBuscado);

    //Actualizar la cantidad de productos en carrito del nav
    let itemsEnCarrito = calcularProductosCarrito(contenidoCarrito);
    actualizarNumeroProductosCarrito(numeroCarrito,contenidoCarrito);

    //Actualizar localStorage
    guardarCarritoEnLocalStorage(contenidoCarrito);
}

function eliminarProductoCarrito(idProductoEliminar){
    //Buscar el producto en la array del carrito
    let productoBuscado = contenidoCarrito.find((producto)=>producto.id == idProductoEliminar)   
    
    //Yo diría por seguridad que se puede eliminar un producto si se encuentra...
    if(productoBuscado){
        contenidoCarrito = contenidoCarrito.filter((producto)=>producto.id != idProductoEliminar)

        //Pasar el nuevo contenido del carrito para hacer todos los re-renders y generar contenido dinamico
        generarContenidoDinamico(contenidoCarrito);
        let itemsEnCarrito = calcularProductosCarrito(contenidoCarrito);
        actualizarNumeroProductosCarrito(numeroCarrito,contenidoCarrito);

        //Actualizar localStorage
        guardarCarritoEnLocalStorage(contenidoCarrito);

        //ACA HAY QUE RECALCULAR LA CANTIDAD DE PRODUCTOS DEL CARRITO, SI YA SON CERO HAY QUE GENERAR EL DISPLAY DE TU CARRITO ESTA VACIO !!!!!!!!!!!!!!!!
        if(contenidoCarrito<1){
            //si ya no queda mas nada en el carrito NO VALE TRATAR DE CONTAR PRODUCTOS EN UN CARRO VACIO !!
            displayCarritoVacio()
        }
    }

}


// Para volver a generar todo lo dinamico en una sola funcion
function generarContenidoDinamico(contenidoActualCarrito){
    //re render + recapturar botones
        //actualizar numero carrito     empieza a tener pinta de funcion independiente
    poblarCarrito(contenidoActualCarrito);

    //Recapturar los botones recien creados 
    capturarYEscucharBotones();

    //Hay que volver a agregar el boton de finalizar compra
    agregarContenedorFinalizarCompra()

}

function capturarYEscucharBotones(){
    botonesDescontarCantidad = document.querySelectorAll(".producto-carrito__descontar-cantidad");
    botonesAumentarCantidad = document.querySelectorAll(".producto-carrito__aumentar-cantidad");
    botonesEliminarProducto = document.querySelectorAll(".producto-carrito__eliminar")


    //Agregar todos los eventListeners

    //Debido a algunas fallas ya no se pasa el objeto e como parámetro sino directamente el atributo data correspondiente

    botonesDescontarCantidad.forEach((boton)=>boton.addEventListener("click",(e)=>{descontarCantidadProducto(e.target.dataset.idMenos)}));
    botonesAumentarCantidad.forEach((boton)=>boton.addEventListener("click",(e)=>{aumentarCantidadProducto(e.target.dataset.idMas)}));
    botonesEliminarProducto.forEach((boton)=>boton.addEventListener("click",(e)=>{eliminarProductoCarrito(e.target.dataset.idEliminar)}));

}


function actualizarSpanCantidadYSubtotal(producto){

    let idProducto = producto.id

    let spanCantidad = document.querySelector(`[data-id-cantidad="${idProducto}"]`)
    spanCantidad.innerText = producto.cantidad

    let spanSubtotal = document.querySelector(`[data-id-subtotal="${idProducto}"]`)
    spanSubtotal.innerText = "$"+ producto.cantidad * producto.price
}




/* SECCION FINALIZAR LA COMPRA */

//Esta función agrega la parte de finalizar compra
function agregarContenedorFinalizarCompra(){
    //Esto solo hace falta si hay algo en el carrito
    if (contenidoCarrito.length >0){

        //Capturar el div donde va el boton finalizar compra
        let contenedorFinalizarCompra = document.querySelector("#contenedor-finalizar-compra")

        //Borro el contenido actual del div para que no se cree mas de un boton
        contenedorFinalizarCompra.innerHTML = "";


        let botonFinalizarCompra = document.createElement("button");
        //Agregar texto al boton
        botonFinalizarCompra.innerText = "Finalizar compra";
        //Agregar clase y id
        botonFinalizarCompra.classList.add("cta-btn");
        botonFinalizarCompra.id = "btn-checkout";

        //Hay que agregar el eventListener al boton de finalizar compra
        botonFinalizarCompra.addEventListener("click",finalizarCompra)

        //Agregar el boton al contenedor
        contenedorFinalizarCompra.appendChild(botonFinalizarCompra);
    }
}

//Calback para el eventListener del boton de finalizar compra
function finalizarCompra(){
    const dialogoFinalizarCompra = document.getElementById("dialogo-finalizar-compra");

    const spanTotalPagar = document.getElementById("total-a-pagar");

    //Botones de confirmar o cancelar compra y sus eventListeners
    const btnComprar = document.getElementById("btn-comprar")
    const btnVolverCarrito = document.getElementById("btn-volver-carrito")

    btnVolverCarrito.addEventListener("click", ()=>{
        dialogoFinalizarCompra.close();
    });

    btnComprar.addEventListener("click",()=>{
        //Borrar el carrito
        localStorage.removeItem("contenido_carrito_de_compras");
        //Volver al index
        window.location.href="../index.html"
        console.log("YA COMPRAMOS GRACIAS");   
    })


    //Acá hay que generar contenido dinámico en el dialog

    //Primero la lista de Productos

    const listaProductos = document.getElementById("lista-articulos-comprar");
    //Por si acaso quitar todos los productos que podrian haber quedado de un llamado anterior
    listaProductos.innerHTML =""; //Me gustaria una forma mejor de hacer esto 

    let totalGasto = 0;

    //Generar los li dinamicamente y sumar subtotales
    contenidoCarrito.forEach(producto =>{
        let li = document.createElement("li")
        li.textContent = producto.title;
        listaProductos.appendChild(li);

        //Sumar los subtotales
        totalGasto += (producto.cantidad * producto.price) 
    })
    
    spanTotalPagar.textContent = totalGasto;

    dialogoFinalizarCompra.showModal();

    console.log("GRACIAS POR DEJAR TU DINERITO AQUI")
}

//ACA SE GENERA DISPLAY DE CARRITO VACIO
function displayCarritoVacio(){
    //Deberia quitar el boton de finalizar compra en caso que exista
    let botonFinalizarCompra = document.querySelector("#btn-checkout");
    if (botonFinalizarCompra) {
        botonFinalizarCompra.remove();
    }

    //Crear elemento    
    const msgCarritoVacio = document.createElement("p")
    //Agregarle texto
    msgCarritoVacio.textContent = "EL CARRITO ESTA VACIO"
    //Agregar clase
    msgCarritoVacio.classList.add("msg-carrito-vacio")
    //Agregar el elemento a la pagina
    contenedorProductos.appendChild(msgCarritoVacio)
}