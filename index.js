const express = require('express');

const app = express();

app.set('port', 3000);

app.set('/',(req,res)=>{
  res.send('Hola mundo')
})

app.listen(app.get('port'), (req, res) => {
  console.log(`Server running on http://localhost:${app.get('port')}`);
});
