var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require ('body-parser');

//connect tpo mongo db server for specified db; if not present , it will create one for you
var db;
if(process.env.ENV == 'Test'){
 db = mongoose.connect('mongodb://localhost/bookAPI_test');
}
else{
db = mongoose.connect('mongodb://localhost/bookAPI');
}
var PORT = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//clean the code and get bookRouter from other file
var bookRouter = require('./routes/bookroutes')();
app.use('/api',bookRouter);

//these apis are without router and can be implemented in this way:->
app.get('/',function(req,res){
    res.send('welcome to my api');
});
app.get('/vishal/',function(req,res){
    res.send('my name is vishal');
});

//listening on port
app.listen(PORT,function(){
    console.log('running on port'+PORT);
});

module.exports = app;