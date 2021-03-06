const router = require('express').Router();
const rootDir = require('../util/path');
const path = require('path');
const fs = require('fs');
let products = require(path.join(rootDir, 'db', 'products.json'));

router.get('/', (req, res) => {
  res.render('products', {
    path: '/products',
    name: 'PRODUCTOS',
    products: products,
    isThereCart: false,
  });
});

router.post('/addProduct', (req, res) => {
  const productExists = products.find(
    (product) => product.name.toLowerCase() === req.body.name.toLowerCase(),
  );
  if (!productExists) {
    // console.log(true);
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

  fs.writeFile(path.join(path.join(rootDir, 'db', 'products.json')), data, function (err) {
    if (err) return console.error(err);
  });
  res.redirect('/');
});

module.exports = router;
