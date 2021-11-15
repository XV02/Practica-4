class ShoppingCart{
    constructor(){
        this._proxies = new Array();
        this._products = new Array();
    }

    contains(uuid){
        let search = elem => elem.uuid === uuid;
        let index = this.proxies.findIndex(search);
        return index !== -1;
    }

    getProductById(uuid){
        let index = this._products.findIndex(elem => elem.uuid == uuid);
        if(index !== -1){
            return this._products[index];
        }
        else{
            return undefined;
        }
    }

    addItem(uuid, quantity){
        let search = elem => elem.uuid === uuid;
        let index = this.proxies.findIndex(search);
        if(index !== -1){
            this.proxies[index].quantity += quantity;
        }
        else{
            this.proxies.push(new ProductProxy(uuid, quantity));
        }
    }

    updateAndAddItem(uuid, amount){
        let search = elem => elem._uuid === uuid;
        let index = this._proxies.findIndex(search);
        if(index !== -1){
            if(amount === 0){
                this.proxies.splice(index, 1);
            }
            else{
                this.proxies[index].quantity += amount;
            }
        }
        else{
            throw new ShoppingCartException("El producto no está en el carrito: "+uuid);
        }
    }

    updateItem(uuid, amount){
        let search = elem => elem._uuid === uuid;
        let index = this._proxies.findIndex(search);
        if(index !== -1){
            if(amount === 0){
                this.proxies.splice(index, 1);
            }
            else{
                this.proxies[index].quantity = amount;
            }
        }
        else{
            throw new ShoppingCartException("El producto no está en el carrito: "+uuid);
        }
    }

    removeItem(uuid){
        let search = elem => elem.uuid === uuid;
        let index = this.proxies.findIndex(search);
        if(index !== -1){
            this.proxies.splice(index, 1);
        }
        else{
            throw new ShoppingCartException("No puede eliminar un producto que no está en su carrito: "+uuid);
        }
    }

    calculateTotal(){
        let total = 0;
        for(const x in this.proxies){
            total += this.proxies[x].quantity * this.products[x].pricePerUnit;
        }
        return total;
    }

    get proxies(){
        return this._proxies;
    }
    get products(){
        return this._products;
    }

    set products(products){
        this._products = products;
    }

    saveShoppingCart() {
        const shoppingCart = JSON.stringify(this._proxies);
        sessionStorage.setItem('shoppingCart', shoppingCart);
    }

    loadShoppingCart() {
        const shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
        if (shoppingCart) {
            this._proxies = shoppingCart.map(p => new ProductProxy(p._uuid, p._quantity));
            // this._proxies = shoppingCart;
        }
    }
}

class ProductProxy{
    constructor(uuid, quantity){
        this.uuid = uuid;
        this.quantity = quantity;

    }

    set uuid(uuid){
        this._uuid = uuid;
    }
    set quantity(quantity){
        if(isNaN(+quantity)){
            throw new ShoppingCartException("La cantidad debe ser un número");
        }
        if(+quantity < 0){
            throw new ShoppingCartException("La cantidad no puede ser negativo");
        }
        this._quantity = +quantity;
    }

    get uuid(){
        return this._uuid;
    }
    get quantity(){
        return this._quantity;
    }
}

class ShoppingCartException{
    constructor(error){
        this.error = error;
    }
}

const cart = new ShoppingCart();

cart.loadShoppingCart();