"use strict";

let fs = require('fs');
let Product = require('./product');

let content = fs.readFileSync('./app/data/products.json');
let products = JSON.parse(content).map(Product.createFromObject);

function updateFile(){
    fs.writeFile('app/data/products.json', JSON.stringify(products, null, 2), (err) => {
        if(err){
            console.log(err);
        }
    });
}

function getProducts(){
    return products;
}
function getProductById(uuid){
    let index = products.findIndex(elem => elem.uuid == uuid);
    if(index !== -1){
        return products[index];
    }
    else{
        return undefined;
    }
}

function createProduct(obj){
    let newP = Product.createFromObject(obj);
    products.push(newP);
    return newP;
}

function updateProduct(uuid, newProduct){
    let index = products.findIndex(elem => elem.uuid === uuid);
    if(index !== -1){
        products[index] = Object.assign(products[index], newProduct);
        return products[index];
    }
    else{
        throw new DataHandlerException("No existe el producto: "+uuid+", "+JSON.stringify(newProduct));
    }
}

function deleteProduct(uuid){
    let index = products.findIndex(elem => elem.uuid === uuid);
    let title = products[index].title;
    if(index !== -1){
       products.splice(index, 1);
       return title;
    }
    else{
        throw new DataHandlerException("Producto no encontrado para eliminar: "+uuid);
    }
}

function findProduct(query){
    let search = query.split(":");
    let result;
    if(search.length === 1){
        let title  = search[0].substring(1,search[0].length-1);
        result = products.filter(elem => elem.title.includes(title));
    }
    else{
        if(search[1] === ""){
            let cat = search[0].substring(1,search[0].length-1);
            result = products.filter(elem => elem.category.includes(cat));
        }
        else{
            let title  = search[1].substring(1,search[1].length-1);
            let cat = search[0].substring(1,search[0].length-1);
            result = products.filter(elem => elem.category.includes(cat) && elem.title.includes(title));
        }
    }
    return result;
}

class DataHandlerException{
    constructor(error){
        this.error = error;
    }
}

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.findProduct = findProduct;
exports.createProduct = createProduct;
exports.updateFile = updateFile;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;