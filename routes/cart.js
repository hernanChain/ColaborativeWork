const router = require('express').Router();
const rootDir = require('../util/path');
const path = require('path');
router.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'cart.html'));
});
module.exports = router;
