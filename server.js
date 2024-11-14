var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var controller = require('./controllers/controller');
app.set('view engine', 'ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('./public'));

// Render home.ejs when '/home' is accessed
app.get('/home', (req, res) => {
  controller.getEmployees((err, data) => {
    if (err) throw err;
    res.render('home', { employee: data });
  });
});

// Render index.ejs when '/' is accessed
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', urlencodedParser, controller.addEmployee);
app.get('/:_id', controller.getEmployeeById);
app.delete('/:_id', controller.deleteEmployee);
app.post('/:_id', urlencodedParser, controller.updateEmployee);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});