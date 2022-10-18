const COMPRAR_CARRITO ="https://japceibal.github.io/emercado-api/user_cart/25801.json"
let carrito = []


document.addEventListener("DOMContentLoaded", function(e){ 
    getJSONData(COMPRAR_CARRITO).then (function(resultObj){
        if (resultObj.status === "ok")
        {
            carrito = resultObj.data;
            comprarProductos(carrito);
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
        <div class="col"><input type="number"  id="input${id}" oninput="costo(${id})" min="1" value="${count}"> </div>
        <div class="col" id="ctotal${id}">${currency + unitCost * count} </div>
      </div> <hr>
        `;

        
       
       document.getElementById("comprar").innerHTML = htmlContentToPrint;
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