const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { cartRoutes, productsRoutes } = require('./routes');

app.set('port', 4000);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', cartRoutes);
app.use('/products', productsRoutes);

app.use((req, res, next) => {
  // res.send('404: Page Not Found');
  res.sendFile(path.join(__dirname,'views/error.html'));
  // res.render(__dirname,'views/error.html');
});

app.listen(app.get('port'), (req, res) => {
  console.log(`Server running on http://localhost:${app.get('port')}`);
});
