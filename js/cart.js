const COMPRAR_CARRITO ="https://japceibal.github.io/emercado-api/user_cart/25801.json"
let carrito = []
let comprarSubtotal = document.getElementById("comprarSubtotal")
let costoEnvio = document.getElementById("costoEnvio")
let total = document.getElementById("costoTotal")

document.addEventListener("DOMContentLoaded", function(e){ 
    getJSONData(COMPRAR_CARRITO).then (function(resultObj){
        if (resultObj.status === "ok")
        {
            carrito = resultObj.data;
            comprarProductos(carrito);
            costs(); 
        };
    });
}); 
function comprarProductos(carrito){ 
    let htmlContentToPrint = "";
    let {articles} = carrito;
    for (let products of articles){
        let {name, image, currency, unitCost, count, id } = products; 
        
        htmlContentToPrint +=` 
        <div class="row p-3">
        <div class="col"> <img class="img-thumbnail" src="${image}"></div>
        <div class="col">${name}</div>
        <div class="col">${currency + unitCost}</div>
        <div class="col"><input type="number"  id="input${id}" oninput="costo(${id}); costs()" min="1" value="${count}"> </div>
        <div class="col" id="ctotal${id}">${currency + unitCost * count} </div>
      </div> <hr>
        `;  
       
       document.getElementById("comprar").innerHTML = htmlContentToPrint;
       document.getElementById("sub").innerText = currency + unitCost * count; 
       localStorage.setItem("subTotal", unitCost * count); 
    } 
}


function costo(id){
const input = document.getElementById("input" + id);
const cantidad = parseFloat(input.value);
let {articles} = carrito;
    for (let products of articles){
        let {unitCost, currency } = products;
        if(isNaN(cantidad)){
            document.getElementById("ctotal" + id).innerText = currency + "0";
        }else{
            document.getElementById("ctotal" + id).innerText = currency + (unitCost * cantidad);
        }
    }
}


function costs() {
    let subTotal = parseFloat(localStorage.getItem("subTotal"));
    let premium = document.getElementById("premium");
    let standard = document.getElementById("standard");
    let express = document.getElementById("express");
    const valEnvio = parseFloat(
      premium.checked
        ? premium.value
        : express.checked
        ? express.value
        : standard.checked
        ? standard.value
        : "0"
    );
  
    document.getElementById("envio").innerText = "USD" + subTotal * valEnvio;
    document.getElementById("total").innerText =
      "USD" + (valEnvio * subTotal + subTotal);
  }


  function mediosDePago() {
    let tarjeta = document.getElementById("tarjeta");
    let transfer = document.getElementById("transfer");
    let nTarjeta = document.getElementById("nTarjeta");
    let codSeg = document.getElementById("codSeg");
    let ven = document.getElementById("ven");
    let nCuenta = document.getElementById("nCuenta");
  
    tarjeta.checked
      ? ((nCuenta.disabled = true),
        (nTarjeta.disabled = false),
        (codSeg.disabled = false),
        (ven.disabled = false))
      : ((nTarjeta.disabled = true),
        (codSeg.disabled = true),
        (ven.disabled = true),
        (nCuenta.disabled = false));
  }

  
(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

 