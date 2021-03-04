const router = require('express').Router();
const rootDir = require('../util/path');
const path = require('path');
let products = require('../db/products.json');
let cart = require('../db/cart');
const fs = require('fs');
let weightAllow=true;

const total = function () {
  let total = 0;
  cart.forEach((item) => {
    total += item.total;
  });
  return total;
};
router.get('/', (req, res) => {
  // console.log('3-----> ',products);
  const subtotal = total();
  const iva = subtotal * 0.19;
  const totalReceipt = subtotal + iva;
  res.render('cart', {
    path: '/cart',
    products: products,
    flag: weightAllow,
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
    iva: iva.toFixed(2),
    total: totalReceipt.toFixed(2),
  });
});

router.post('/cleanCart', (req, res) => {
  products = require('../db/products.json');
  for(var i = 0; i < cart.length; i+=1){
    products.forEach(function(product1){
      if (product1.name===cart[i].name) {
        product1.stock -= parseInt(cart[i].weight);
      }
    })

    const data = JSON.stringify(products);
    try {
      fs.writeFileSync(path.join(rootDir, 'db', 'products.json'), data);
    } catch (error) {
      console.error(error);
    }
  }
  cart = [];
  res.redirect('/');
});

router.post('/addItem', (req, res) => {
  const itemAdded = products.find((item) => item.name === req.body.itemSelected);
  const itemInCart = cart.find((item) => item.name === req.body.itemSelected);
  // console.log(itemAdded);
  // console.log(itemInCart.weight);
  weightAllow=true;
  if (!itemInCart ) {
      if (itemAdded.stock>=parseInt(req.body.weightItem)) {
        const newItem = {
        name: req.body.itemSelected,
        weight: req.body.weightItem,
        price: itemAdded.price,
        total: req.body.weightItem * itemAdded.price,
      };
      cart.push(newItem);
    } else {
//primer ingreso
      weightAllow=false;
    }
  } else {
    if (itemAdded.stock>=(parseInt(itemInCart.weight) + parseInt(req.body.weightItem))) {
        itemInCart.weight = parseInt(itemInCart.weight) + parseInt(req.body.weightItem);
        itemInCart.total += parseInt(req.body.weightItem) * itemAdded.price;
    } else {
//primer ingreso
      weightAllow=false;
    }
  }
  res.redirect('/');
});

// router.post('/alert', (req, res) => {
//   res.render('cart',{
//     path:'/alert',
//     msg_alert:"No puede agregar  libras de \n porque excede la disponibilidad del producto"
//   });
// });

router.post('/cleanItem', (req, res) => {
  const newCart = cart.filter((item) => item.name != req.body.toRemove);
  cart = newCart;
  res.redirect('/');
});
router.post('/backCart', (req, res) => {
  res.redirect('/');
});

module.exports = router;
