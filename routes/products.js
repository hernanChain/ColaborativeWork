const router = require('express').Router();
const rootDir = require('../util/path');
const path = require('path');
const fs = require('fs');
let products = require(path.join(__dirname,'\\..\\db\\','\products.json'));

router.get('/', (req, res) => {
  res.render('products', {
    path: '/products',
    name: 'PRODUCTOS',
    products: products,
    isThereCart: false,
  });
});

router.post('/toDelete', (req, res) => {
  const productExists = products.find(
    (product) => product.name === req.body.toDelete,
  );
  if (productExists) {
    productExists.stock = parseInt(0);
  }
  products = products.filter((item) => item.name != req.body.toDelete);
  const data = JSON.stringify(products);
  fs.writeFile(path.join(__dirname,'\\..\\db\\','\products.json'), data, function(err) {
    if(err) return console.error(err);
  });
  res.redirect('/');
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
  // location.reload();
  res.redirect('/');
});

module.exports = router;
