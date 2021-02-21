const router = require('express').Router();
router.get('/', (req, res) => {
  res.send('Cart');
});
module.exports = router;
