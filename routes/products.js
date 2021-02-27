const router = require('express').Router();
const rootDir = require('../util/path');
const path = require('path');

router.get('/', (req, res) => {

  //res.sendFile(path.join(rootDir, 'views', 'products.html'));
  res.render('products');
});


module.exports = router;
