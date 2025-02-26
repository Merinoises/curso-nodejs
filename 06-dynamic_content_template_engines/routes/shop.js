const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin')


const router = express.Router();

router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {
        prods: products, 
        hasProducts: products.length > 0, 
        pageTitle: 'Shop', 
        path: '/',
        activeShop: true,
        productCSS: true,
    });
});

module.exports = router;