const router = require('express').Router();
const rootDir = require('../util/path');
const path = require('path');

router.get('/', (req, res) => {
  //res.sendFile(path.join(rootDir, 'views', 'cart.html'));
  res.render('cart');
});

router.get('/cart', (req, res) => {
  //res.sendFile(path.join(rootDir, 'views', 'cart.html'));
  res.render('cart');
});

router.get('/receipt', (req, res) => {
  //res.sendFie(path.join(rootDir, 'views', 'receipt.html'));
  res.render('receipt');
});

router.get('/addCart', (req, res) => {
  //res.sendFile(path.join(rootDir, 'views', 'addCart.html'));
  res.render('addCart');
});

module.exports = router;
