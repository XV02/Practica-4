"use strict";

const utils = require('./utils');

class Product{
    constructor(title, description, imageURL, unit, stock, pricePerUnit, category){
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
        this.unit = unit;
        this.stock = stock;
        this.pricePerUnit = pricePerUnit;
        this.category = category
        this._uuid = utils.generateUUID();
    }
    set uuid(uuid){
        throw new ProductException("Es sólo para uso interno");
    }
    set title(title){
        if(title == undefined){
            throw new ProductException("El título no puede estar vacío");
        }
        if(title.length == 0){
            throw new ProductException("El título no puede estar vacío");
        }
        this._title = title;
    }
    set description(description){
        if(description == undefined){
            throw new ProductException("La descripción no puede estar vacía");
        }
        if(description.length == 0){
            throw new ProductException("La descripción no puede estar vacía");
        }
        this._description = description;
    }
    set imageURL(imageURL){
        if(imageURL == undefined){
            throw new ProductException("La URL de imagen no puede estar vacía");
        }
        if(imageURL.length == 0){
            throw new ProductException("La URL de imagen no puede estar vacía");
        }
        this._imageURL = imageURL;
    }
    set unit(unit){
        if(unit == undefined){
            throw new ProductException("La unidad no puede estar vacía");
        }
        if(unit.length == 0){
            throw new ProductException("La unidad no puede estar vacía");
        }
        if(unit.length > 10){
            throw new ProductException("El nombre de la unidad no puede ser tan larga");
        }
        this._unit = unit;
    }
    set stock(stock){
        if(isNaN(+stock)){
            throw new ProductException("El stock debe ser un número");
        }
        if(+stock < 0){
            throw new ProductException("El stock no puede ser negativo");
        }
        this._stock = +stock;
    }
    set pricePerUnit(pricePerUnit){
        if(isNaN(+pricePerUnit)){
            throw new ProductException("El precio por unidad debe ser un número");
        }
        if(+pricePerUnit < 0){
            throw new ProductException("El precio por unidad no puede ser negativo");
        }
        this._pricePerUnit = +pricePerUnit;
    }
    set category(category){
        if(category == undefined){
            throw new ProductException("La categoría no puede estar vacía");
        }
        if(category.length == 0){
            throw new ProductException("La categoría no puede estar vacía");
        }
        if(category.length > 20){
            throw new ProductException("El nombre de la categoría no puede ser tan larga");
        }
        this._category = category;
    }

    get uuid(){
        return this._uuid;
    }
    get title(){
        return this._title;
    }
    get description(){
        return this._description;
    }
    get imageURL(){
        return this._imageURL;
    }
    get unit(){
        return this._unit;
    }
    get stock(){
        return this._stock;
    }
    get pricePerUnit(){
        return this._pricePerUnit;
    }
    get category(){
        return this._category;
    }

    static createFromJSON(JSONValue){
        let object = JSON.parse(JSONValue);
        this.cleanObject(object);
        object = this.createFromObject(object);
        return object;
    }
    
    static createFromObject(obj){
        let product = {};
        Object.assign(product, obj);
        Product.cleanObject(product);

        return new Product(product.title, 
            product.description,
            product.imageURL,
            product.unit,
            product.stock,
            product.pricePerUnit,
            product.category);
    }
    
    static cleanObject(obj){
        const productProperties = ['uuid', 'title', 'description', 'imageURL', 'unit', 'stock', 'pricePerUnit', 'category'];
        for(const p in obj){
            if(!productProperties.includes(p)){
                delete obj[p];
            }
        }
    }

    static isValid(obj){
        const properties = ['title', 'description', 'imageURL', 'unit', 'stock', 'pricePerUnit', 'category'];
        const missing = [];
        let err = false;
        for (const prop of properties) {
            if (!(prop in obj)) {
                err = true;
                missing.push(prop);
            }
        }
        if (err) {
            throw new ProductException(missing);
        }
    }
    
    toJSON() {
        return {
          uuid: this.uuid,
          title: this.title,
          description: this.description,
          imageURL: this.imageURL,
          unit: this.unit,
          stock: this.stock,
          pricePerUnit: this.pricePerUnit,
          category: this.category,
        };
      }
}

class ProductException{
    constructor(error){
        this.error = error;
    }
}

module.exports = Product;