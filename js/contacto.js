//Capturar los input del formulario de contacto

const campoNombre = document.getElementById("nombre");
const campoEmail = document.getElementById("email");
const campoComentario = document.getElementById("comentario");

//Capturar el boton de enviar formulario

const btnEnviarFormulario = document.getElementById("btn-enviar-formulario")

//Funcion para el callback del eventListener del boton de enviar formulario

function verificarCamposFormulario(){
    const contenidoCampoNombre = campoNombre.value;
    const contenidoCampoEmail = campoEmail.value;
    const contenidoCampoComentario = campoComentario.value;

    if(contenidoCampoNombre && contenidoCampoEmail && contenidoCampoComentario){
        console.log("TODOS LOS CAMPOS DEL FORMULARIO ESTAN COMPLETOS")
    }
    else{
        console.log("FIJATE QUE FALTA COMPLETAR ALGO")
    }

}

//Agregar el eventListener al boton de enviar formulario

btnEnviarFormulario.addEventListener("click", verificarCamposFormulario)