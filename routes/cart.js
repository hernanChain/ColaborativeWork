const router = require('express').Router();
const rootDir = require('../util/path');
const path = require('path');
let products = require('../db/products.json');

let cart = require('../db/cart');
const fs = require('fs');

const total = function () {
  let total = 0;
  cart.forEach((item) => {
    total += item.total;
  });
  return total;
};

router.get('/', (req, res) => {
  const subtotal = total();
  const iva = subtotal * 0.19;
  const totalReceipt = subtotal + iva;
  res.render('cart', {
    path: '/cart',
    products: products,
    name: 'CARRITO DE COMPRAS',
    cart: cart,
    isThereCart: cart.length > 0,
    subtotal: subtotal,
    iva: iva,
    total: totalReceipt,
  });
});

router.get('/receipt', (req, res) => {
  const subtotal = total();
  const iva = subtotal * 0.19;
  const totalReceipt = subtotal + iva;
  res.render('receipt', {
    cart: cart,
    subtotal: subtotal,
    iva: iva,
    total: totalReceipt,
  });
});
router.post('/cleanCart', (req, res) => {
  cart = [];
  res.redirect('/');
});
router.post('/addItem', (req, res) => {
  const itemAdded = products.find((item) => item.name === req.body.itemSelected);
  const itemInCart = cart.find((item) => item.name === req.body.itemSelected);
  if (!itemInCart) {
    const newItem = {
      name: req.body.itemSelected,
      weight: req.body.weightItem,
      price: itemAdded.price,
      total: req.body.weightItem * itemAdded.price,
    };
    cart.push(newItem);
  } else {
    itemInCart.weight = parseInt(itemInCart.weight) + parseInt(req.body.weightItem);
    itemInCart.total += parseInt(req.body.weightItem) * itemAdded.price;
  }
  res.redirect('/');
});
router.post('/cleanItem', (req, res) => {
  const newCart = cart.filter((item) => item.name != req.body.toRemove);
  cart = newCart;
  res.redirect('/');
});
router.post('/backCart', (req, res) => {
  res.redirect('/');
});

module.exports = router;
