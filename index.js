const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { cartRoutes, productsRoutes } = require('./routes');

app.set('port', 4000);
app.set('views', 'views');

app.use('/', cartRoutes);
app.use('/products', productsRoutes);

app.use((req, res, next) => {
  res.send('404: Page Not Found');
});

app.listen(app.get('port'), (req, res) => {
  console.log(`Server running on http://localhost:${app.get('port')}`);
});
