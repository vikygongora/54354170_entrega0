let inputEmail = document.getElementById("emailInput"); 
let localEmail = localStorage.getItem("email")
let inputNombre = document.getElementById("nombre"); //variables para guardar todos los input en el localStorage
let localNombre = localStorage.getItem("nombre");  // get del localStorage trae los datos
let inputSegundoNombre = document.getElementById("snombre");
let localSegundoNombre = localStorage.getItem("snombre")
let inputApellido = document.getElementById("apellido");
let localApellido = localStorage.getItem("apellido")
let inputSegundoApellido = document.getElementById("sapellido");
let localSegundoApellido = localStorage.getItem("sapellido")
let inputNumero = document.getElementById("numero");
let localNumero = localStorage.getItem("numero")

//desafiate
const foto = document.getElementById("foto");
const file = document.getElementById("file");

document.addEventListener("DOMContentLoaded", function(e){ //get de los inputs guarda con el value
   inputEmail.value = localEmail;
   inputNombre.value = localNombre;
   inputSegundoNombre.value = localSegundoNombre;
   inputApellido.value = localApellido;
   inputSegundoApellido.value = localSegundoApellido;
   inputNumero.value = localNumero;

   const fotoDePerfil = localStorage.getItem("image"); //parte del desafiate
   if(fotoDePerfil) {
    foto.setAttribute("src", fotoDePerfil);
   }
});



function guardadoPerfil() { // funcion que guarda en el local todos los valores de los inputs
localStorage.setItem("nombre", inputNombre.value);
localStorage.setItem("snombre", inputSegundoNombre.value);
localStorage.setItem("apellido", inputApellido.value);
localStorage.setItem("sapellido", inputSegundoApellido.value);
localStorage.setItem("numero", inputNumero.value);
}


(function () { //funcion de boostrap validacion
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          guardadoPerfil() // llamado de funcion para el local
          form.classList.add('was-validated')
        }, false)
      })
})()

file.addEventListener("change", function () { // funcion sacada de un tutorial para desafiate
    const choosedFile = this.files [0]; 

    if (choosedFile) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            localStorage.setItem("image", reader.result);
            foto.setAttribute("src", reader.result);
        });
        reader.readAsDataURL(choosedFile);
    }
})