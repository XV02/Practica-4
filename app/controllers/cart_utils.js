let cartButton = document.getElementById("cartButton");
let cartList = document.getElementById("cartList");
let summary = document.getElementById("summary");
let productsURL = "/products";
let quantityToEdit = undefined;

function deleteItem(uuid){
    cart.updateItem(uuid, 0);
    createCart();
    updateSummary();
    updateButton();
    cart.saveShoppingCart();
}

function updateButton(){
    cartButton.innerHTML = `<i class="fas fa-shopping-cart"></i>${cart._proxies.length}`
}

function editItem(event, uuid){
    event.preventDefault();
    let updateButton = document.getElementById("u-"+uuid);
    let editButtons = document.getElementById("editButtons-"+uuid)
    let quantity = document.getElementById("q-"+uuid);

    updateButton.style.display = 'none';
    editButtons.style.display = '';
    quantity.removeAttribute('disabled');
    quantityToEdit = quantity.value;
}

function cancelEdit(event, uuid){
    event.preventDefault();
    let updateButton = document.getElementById("u-"+uuid);
    let editButtons = document.getElementById("editButtons-"+uuid)
    let quantity = document.getElementById("q-"+uuid);

    updateButton.style.display = '';
    editButtons.style.display = 'none';
    quantity.setAttribute('disabled', '');
    quantity.value = quantityToEdit;
}

function confirmEdit(event, uuid){
    event.preventDefault();
    let uButton = document.getElementById("u-"+uuid);
    let editButtons = document.getElementById("editButtons-"+uuid)
    let quantity = document.getElementById("q-"+uuid);

    cart.updateItem(uuid, +quantity.value);
    cart.saveShoppingCart();
    console.log(quantity.value);

    uButton.style.display = '';
    editButtons.style.display = 'none';
    quantity.setAttribute('disabled', '');

    createCart();
    updateSummary();
    updateButton();
}

function proxiesToHTML(proxies){
    return proxies.map((proxy) =>{
        let product = cart.getProductById(proxy._uuid);
        return `<div id = "${proxy._uuid}" class="media border rounded">
        <div class="row w-100">
            <div class="media-body mt-2 col-12 col-lg-9">
                <h4 class="col-12 title">${product.title}
                    <button class="btn btn-danger" onclick="deleteItem('${proxy._uuid}')"><i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </h4>
                <div class="input-group mb-2 ml-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Cantidad:</span>
                    </div>
                    <input id="q-${proxy._uuid}" type="number" disabled class="form-control" value="${proxy._quantity}" min="1">
                    <button id="u-${proxy._uuid}" class="btn btn-info" onclick="editItem(event, '${proxy._uuid}')">
                        <i class="fa fa-pen" aria-hidden="true"></i>
                    </button>
                    <div id="editButtons-${proxy._uuid}" style="display: none">
                        <button id="a-${proxy._uuid}" onclick="confirmEdit(event, '${proxy._uuid}')" class="btn btn-success" >
                            <i class="fa fa-check" aria-hidden="true"></i>
                        </button>
                        <button id="c-${proxy._uuid}" onclick="cancelEdit(event, '${proxy._uuid}')" class="btn btn-danger" >
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div class="input-group mb-2 ml-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Precio:</span>
                    </div>
                    <input type="number" disabled class="form-control" value="${product.pricePerUnit}" min="1">
                    <div class="input-group-append">
                        <span class="input-group-text">$M.N.</span>
                    </div>
                </div>
            </div>
            <img class="ml-auto productImage col-12 col-lg-3" src='${product.imageURL}' alt="One Piece 100">
        </div>
        </div>`;
    }).join("\n");
}

function createCart(){
    cartList.innerHTML = proxiesToHTML(cart.proxies);
}

function updateSummary(){
    let html = `<h3 class="mt-3">Total de compra</h3>
                <hr>`;
    html += cart.proxies.map((proxy) =>{
        let product = cart.getProductById(proxy._uuid);
        return `<p>${product.title} ${proxy._quantity} x ${product.pricePerUnit}</p>`
    }).join("\n");
    let t = 0;
    for(i in cart.proxies){
        let product = cart.getProductById(cart.proxies[i]._uuid);
        t += cart.proxies[i]._quantity*product.pricePerUnit;
    }
    html += `<hr>
            <p id="total">Total a pagar: $${t}</p>
            <button class="btn btn-outline-success btn-block btn-lg">Pagar</button>
            <button class="btn btn-outline-danger btn-block mb-4">Cancelar</button>`;
    summary.innerHTML = html;
}


loadProducts(productsURL).then(p =>{
    cart.products = p;
    createCart();
    updateSummary();
}).catch(e => console.warn(e));
updateButton();