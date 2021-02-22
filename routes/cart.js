const router = require('express').Router();
const rootDir = require('../util/path');
const path = require('path');
router.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'cart.html'));
});
router.get('/receipt', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'receipt.html'));
});
router.get('/addCart', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'addCart.html'));
});

module.exports = router;
