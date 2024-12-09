var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");

var searchInput = document.getElementById("searchInput")
var inAddMode = true;
var mainIndex = 0;
var addupdatebtn =  document.getElementById("addupdateBtn");
var tablebody = document.getElementById("tBody")
var productsContainer = []
if(localStorage.getItem("products") != null){
    productsContainer= JSON.parse(localStorage.getItem("products"));
    displayProduct()
}


function addUpdateProduct(){    
    var product ={
        name: productNameInput.value,
        price: productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value,
    }
      

    if(inAddMode){
        addproduct(product)
    }else{
        updateproduct(product)
    }

    localStorage.setItem("products",JSON.stringify(productsContainer))
    displayProduct()
    clear()
 } 
function addproduct(product){
    productsContainer.push(product); 
}
function updateproduct(product){
      productsContainer.splice(mainIndex,1,product)
        addupdatebtn.innerHTML="Add Product"
        inAddMode = true;
}

function  displayProduct(){
   var searchterm = searchInput.value
    var cartona = "";
    for(var i = 0 ; i< productsContainer.length ; i++){
        if(productsContainer[i].name.toLowerCase().includes(searchterm.toLowerCase())){
            cartona +=
            `
            <tr>
                 <td>${i}</td>
                 <td>${productsContainer[i].name}</td>
                 <td>${productsContainer[i].price}</td>
                 <td>${productsContainer[i].category}</td>
                 <td>${productsContainer[i].desc}</td>
                 <td>
                   <button onclick=patchValue(${i}) class="btn btn-outline-warning">Update</button>
                 </td>
                 <td><button onclick=deleteproduct(${i})  class="btn btn-outline-danger">Delete</button>
                 </td>
            </tr>     
                 `   
        }          
}
tablebody.innerHTML = cartona;
}
function clear(){
    productNameInput.value="";
    productPriceInput.value="";
    productCategoryInput.value="";
    productDescInput.value="";    
}
function deleteproduct(productIndex){
 productsContainer.splice(productIndex,1);
 localStorage.setItem("products",JSON.stringify(productsContainer));
 displayProduct()
}
function patchValue(productIndex){
    mainIndex = productIndex
    var product = productsContainer[productIndex]
    productNameInput.value=product.name;
    productPriceInput.value=product.price;
    productCategoryInput.value=product.category;
    productDescInput.value=product.desc; 

    addupdatebtn.innerHTML="Update Product"
    inAddMode = false;
    
}

