let contraseña =  document.getElementById("password");
let email = document.getElementById("login");
const boton = document.getElementById("boton");

boton.addEventListener("click", ingresar);

function ingresar(){
  if(contraseña.value.length > 0 && email.value.length > 0){
    alert("Exito!")
    IngresoExito()
  }else{
    alert("Fallo!")
  }
}

function IngresoExito(){
    window.location.href = "inicio.html";
}