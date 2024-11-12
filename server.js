var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var controller = require('./controllers/controller');
app.set('view engine', 'ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('./public'));

// Render home.ejs when '/home' is accessed
app.get('/home', (req, res) => {
  res.render('home'); // Ensure home.ejs is in the views folder
});

controller(app);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
