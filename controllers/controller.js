var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');


var data = [];
module.exports = function(app){
    
    app.get('/', (req,res)=>{
        
        res.render('index');
    });
};