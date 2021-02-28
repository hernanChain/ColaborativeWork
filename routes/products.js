const router = require('express').Router();
const rootDir = require('../util/path');
const path = require('path');
const fs = require('fs');
let products = require('../db/products.json');

router.get('/', (req, res) => {
  res.render('products', {
    path: '/products',
    name: 'PRODUCTOS',
    products: products,
    isThereCart: false,
  });
});

router.post('/toDelete', (req, res) => {
  const newProducts = products.filter((item) => item.name != req.body.toDelete);
  const data = JSON.stringify(newProducts);
  try {
    fs.writeFileSync(path.join(rootDir, 'db', 'products.json'), data);
  } catch (error) {
    console.error(error);
  }
  products = newProducts;
  res.redirect('/products');
});
router.post('/addProduct', (req, res) => {
  const productExists = products.find(
    (product) => product.name.toLowerCase() === req.body.name.toLowerCase(),
  );
  if (!productExists) {
    const newProduct = {
      name: req.body.name,
      price: parseInt(req.body.price),
      stock: parseInt(req.body.stock),
    };
    products.push(newProduct);
  } else {
    productExists.stock += parseInt(req.body.stock);
    productExists.price = parseInt(req.body.price);
  }
  const data = JSON.stringify(products);
  try {
    fs.writeFileSync(path.join(rootDir, 'db', 'products.json'), data);
  } catch (error) {
    console.error(error);
  }
  res.redirect('/products');
});
module.exports = { router, products };
