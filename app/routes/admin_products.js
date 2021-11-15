"use strict";

const express = require("express");
const Product = require("../controllers/product");
const dataHandler = require('../controllers/data_handler');
const router = express.Router();

router.route('/')
    .post((req, res) => {
        try{
            Product.isValid(req.body);
            const product = dataHandler.createProduct(req.body);
            dataHandler.updateFile();
            res.status(201)
                .json({
                    "newProduct": product.title
                });
        } catch(error){
            res.status(400)
                .json({
                    missingFields: error
                });
        }
    });

router.route('/:id')
    .put((req, res) => {
        try{
            Product.isValid(req.body);
        } catch(error){
            res.status(400)
                .json({
                    missingFields: error
                });
        } 
        try{
            const product = dataHandler.updateProduct(req.params.id, req.body);
            dataHandler.updateFile();
            res.status(200)
                .json({
                    "updatedProduct": product.title
                });
        }catch(err){
            res.status(404)
                .json({
                    error: err
                });
        }
    });

router.route('/:id')
    .delete((req, res) => {
        try{
            const title = dataHandler.deleteProduct(req.params.id);
            dataHandler.updateFile();
            res.status(200)
                .json({
                    "deletedProduct": title
                });
        }catch(err){
            res.status(404)
                .json({
                    error: "Not found"
                });
        }
    });

module.exports = router;