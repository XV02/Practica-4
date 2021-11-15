"use strict";

const express = require("express");
const router = express.Router();
const productRouter = require('../routes/products');
const adminProductRouter = require('../routes/admin_products');

router.use('/products', productRouter);
router.use('/admin/products', validateAdmin, adminProductRouter);



router.get('/', (req, res) => {
    res.redirect('/home');
});

router.get('/home', (req, res) => {
    res.
    sendFile(`${process.cwd()}/app/views/home.html`);
})

router.get('/shopping_cart', (req, res) => {
    res.sendFile(`${process.cwd()}/app/views/shopping-cart.html`);
})

router.get('/shopping-cart.html', (req, res) => {
    res.redirect('/shopping_cart');
});

router.get('/home.html', (req, res) => {
    res.redirect('/home');
});

router.get('/images/:name', (req, res) => {
    res.sendFile(`${process.cwd()}/app/images/${req.params.name}`);
});

router.get('/controllers/:name', (req, res) =>{
    res.sendFile(`${process.cwd()}/app/controllers/${req.params.name}`);
});


function validateAdmin(req, res, next){
    if(req.header('x-auth') === 'admin'){
        next();
    }
    else{
        res.status(400)
            .type('text/plain')
            .send('No tienes acceso de administrador');
    }
}

module.exports = router;