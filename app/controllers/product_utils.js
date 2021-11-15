"use strict";

let productContainer = document.getElementById("mainList");
let pagination = document.getElementById("pagination");
let cartButton = document.getElementById("cartButton");
let productsURL = "/products";
let selected = null;
let currentPage = 0;

function addToCart(quantity){
    if (selected) {
        if (cart.contains(selected)) {
            cart.updateAndAddItem(selected, quantity);
        } else {
            cart.addItem(selected, quantity);
        }
        cart.saveShoppingCart();
        selected = null;
        updateButton();
    }
}

function selectItem(uuid){
    selected = uuid;
}
function updateButton(){
    cartButton.innerHTML = `<i class="fas fa-shopping-cart"></i>${cart._proxies.length}`
}

function productToHTML(product){
    return `<div id=${product.uuid} class="card col-sm-6 col-md-4 col-lg-3 col-xs-6 col-6">
                <img class="card-img-top" src="${product.imageURL}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p>1 ${product.unit} x ${product.pricePerUnit}</p>
                    <button data-toggle="modal" data-target="#addProduct" onClick="selectItem('${product.uuid}')" class="btn btn-primary mt-3 btn-block w-100">Agregar</button>
                </div>
                <div class="card-footer">
                    <small class="text-muted">(${product.stock} disponibles)</small>
                </div>
            </div>`;
}

function productListToHTML(productList){
    return productList.map(productToHTML).join("\n");
}

function showPage(page) {
    let start = (page) * 4;
    let end = start + 4;
    console.log(end);
    console.log(cart.products.length - 1);
    console.log(+end > (+cart.products.length - 1));
    if (+end > (+cart.products.length - 1)) end = cart.products.length;
    console.log(cart.products.slice(start, end));
    productContainer.innerHTML = productListToHTML(cart.products.slice(start, end));
    pagination.children[currentPage].classList.remove('active');
    currentPage = page;
    pagination.children[currentPage].classList.add('active');
}

loadProducts(productsURL).then(p =>{
    cart.products = p;
    showPage(0);
}).catch(e => console.warn(e));
updateButton();