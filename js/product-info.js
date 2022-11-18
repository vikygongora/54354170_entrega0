let infoIden = localStorage.getItem('prodID') 
let PRODUCTO_INFO_URL = "https://japceibal.github.io/emercado-api/products/" + infoIden + ".json";
const PRODUCTO_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/" + infoIden + ".json";

let listaDeComentarios = []; 
let productInformacion = [];


document.addEventListener("DOMContentLoaded", function(e){ 
    getJSONData(PRODUCTO_INFO_URL).then (function(resultObj){
        if (resultObj.status === "ok")
        {
            productInformacion = resultObj.data;
            infoProductArray(productInformacion);
        };
    });
}); 


function infoProductArray(productInformacion){ 
    let htmlContentToAppend = "";

    for(let i = 0; i < productInformacion.images.length; i++){ 
        let imageSrc = productInformacion.images[i]; 

            htmlContentToAppend += `
               
                        <div class="container">
                            <img src="` + imageSrc + `" alt="product image" width = "300 px"> 
                        </div>
                        
                `
        }
        document.getElementById("imagenes-info").innerHTML = htmlContentToAppend; 
        document.getElementById("container-info").innerHTML =  `   
        <div class="container">
       <br> <h1> ${productInformacion.name} </h1><br>
        <hr>
        <h4><b> Precio </b></h3> <p>${productInformacion.currency} ${productInformacion.cost}</p>
        <h4><b> Descripción </b></h3> <p>${productInformacion.description}</p>
        <h4><b> Categoría </b></h3> <p>${productInformacion.category}</p>
        <h4><b> Cantidad de vendidos </b></h3> <p>${productInformacion.soldCount}</p>
        <h4><b> Imágenes ilustrativas </b></h3>
        </div>
        `
        productRelacionados(productInformacion);
};

function productRelacionados(productInformacion){ 
    let htmlContentToPrint = "";
    let {relatedProducts} = productInformacion;
    for (let products of relatedProducts){
        let {id, name, image} = products;
        
        htmlContentToPrint +=`<div onclick="setProdID(${id})" class="list-group-item list-group-item-action cursor-active"> 
        <div class="row">
            <div class="col-3">
                <img src="` + image + `" alt="product image" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <h4>` + name + `  </h4> 
                </div>
           </div>    
       </div>    
        `;
        
       document.getElementById("related").innerHTML = htmlContentToPrint;
    } 
}

document.addEventListener("DOMContentLoaded", function(e){ 
    getJSONData(PRODUCTO_INFO_COMMENTS_URL).then (function(resultObj){
        if (resultObj.status === "ok")
        {
            listaDeComentarios = resultObj.data;
            infoComentarios();
            console.log(listaDeComentarios)
        };
    });
}); 
function infoComentarios(){ 
    for(let comentarios of listaDeComentarios){ 
        document.getElementById("contenedor-comentarios").innerHTML += `
        <div class="">
            <p><b>${comentarios.user}</b> ${comentarios.dateTime} 
            ${comentarios.score === 1
            ?` <span class="fa fa-star checked"> 
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`:
            comentarios.score === 2
            ?` <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`:
            comentarios.score === 3
            ?` <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`:
            comentarios.score === 4
            ?` <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>`:
            comentarios.score === 5
            ?` <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked" ></span> `
            :" " } </p>
            <p> ${comentarios.description} </p>

        </div>
        `
        }
        
};
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}