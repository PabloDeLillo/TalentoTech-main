/*MENU EN DISPOSITIVOS MOVILES*/

//Capturar elementos

const botonMenuMovil = document.querySelector("#menu-movil-btn");
const menuLinks = document.querySelector("#menu-links");

//Agregar eventListener al boton menu movil

botonMenuMovil.addEventListener("click",mostrarMenuMovil)



function mostrarMenuMovil(){

    menuLinks.classList.toggle("menu-abierto");

    console.log("APRETASTE EL BOTON !");

    console.log(menuLinks.classList)
}