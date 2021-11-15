"use strict";

const express = require("express");
const router = express.Router();
const dataHandler = require('../controllers/data_handler');

router.route('/')
    .get((req, res) => {
        let query = req.query.filter;
        if(query == undefined){
            try{
                dataHandler.getProducts();
            } catch(e) {
                res.status(400).send(e.err);
            }
            res.status(200).json(dataHandler.getProducts());
        }
        else{
            console.log(query);
            try{
                dataHandler.findProduct(query);
            } catch(e) {
                res.status(400).send(e.err);
            }
            res.status(200).json(dataHandler.findProduct(query));
        }
    });

router.route('/cart')
    .post((req, res) => {
        if(!Array.isArray(req.body)){
            res.status(400)
                .json({
                    'error': 'No es un arreglo'
                });
        }

        let temp = [];
        for(const id of req.body){
            let p = dataHandler.getProductById(id);
            if(p == undefined){
                res.status(404)
                    .json({
                        error: `Product not found: ${id}`
                    });
            }
            temp.push(p);
        }

        res.status(200)
            .json(temp);
    });

router.route('/:id')
    .get((req, res) => {
        let p = dataHandler.getProductById(req.params.id);
        if(p == undefined){
            res.status(404)
                .json({
                    error: `Product not found: ${req.params.id}`
                });
        }

        res.status(200)
            .json(p);
    });

module.exports = router;