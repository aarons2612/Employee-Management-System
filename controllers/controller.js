var objectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://aaronsimon:Dontworry7@cluster0.nuljur3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

var employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  phone: Number,
  title: String,
  address: String,
  age: Number,
  gender: String,
  salary: Number
});

var employeeModel = mongoose.model('addEmployee', employeeSchema);

module.exports = {
  getEmployees: (callback) => {
    employeeModel.find({}, (err, data) => {
      callback(err, data);
    });
  },

  addEmployee: (req, res) => {
    var newEmployee = employeeModel(req.body).save((err, data) => {
      if (err) throw err;
      res.redirect('/home');
    });
  },

  getEmployeeById: (req, res) => {
    employeeModel.find({ _id: req.params._id }, (err, data) => {
      res.render('employee', { employee: data });
    });
  },

  deleteEmployee: (req, res) => {
    employeeModel.find({ _id: req.params._id }).deleteOne((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  },

  updateEmployee: (req, res) => {
    var item = {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      address: req.body.address,
      phone: req.body.phone,
      title: req.body.title,
      salary: req.body.salary
    };
    var id = req.params._id;

    employeeModel.updateOne({ "_id": objectId(id) }, { $set: item }, (err, data) => {
      if (err) throw err;
      res.redirect('back');
    });
  }
};