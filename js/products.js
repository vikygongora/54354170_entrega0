let identifica = localStorage.getItem('catID')
const URL_PRODUCTOS = "https://japceibal.github.io/emercado-api/cats_products/" + identifica + ".json";
let productos = []; 

//filtrado y ordenado
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
//orden botones 
function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; } // cambio name por cost
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList(array){ 
    let htmlContentToAppend = "";

    for(let i = 0; i < productos.length; i++){ 
        let category = productos[i]; 
        let buscador = document.getElementById('buscador').value.toLowerCase();

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) && //agregué las condicionales, cambié por cost
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount)) &&
            ((category.name.toLowerCase().includes(buscador)))) { // desafiate

            htmlContentToAppend += `
                <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3">
                            <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                <h4>` + category.name +` - ` + category.currency + ` ` + category.cost + `  </h4> 
                                <p> `+ category.description +`</p> 
                                </div>
                                <small class="text-muted">` + category.soldCount + ` artículos</small> 
                            </div>

                        </div>
                    </div>
                </div>
                `
        }
        document.getElementById("container-autos").innerHTML = htmlContentToAppend; 
    }
}
function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        productos = categoriesArray; //aca era mi fallo cmabie por products
    }

    productos = sortCategories(currentSortCriteria, productos);// igual que acá

    showCategoriesList();
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(URL_PRODUCTOS).then (function(resultObj){
        if (resultObj.status === "ok")
        {
            productos = resultObj.data.products;
            showCategoriesList(productos);
        };
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
       
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
}); 
