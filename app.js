var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require ('body-parser');
var multer  = require('multer');//for multi part file uploading
var minimist = require ('minimist');
var fs = require("fs");

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
var subpath = express();

app.use(bodyParser());

app.use("/v1", subpath);
var swagger = require('swagger-node-express').createNew(subpath);
//express.static middleware to start serving the files directly
app.use(express.static('dist'));// used to publish static files/images
swagger.setApiInfo({
	    title: "example API",
	    description: "API to do something, manage something...",
	    termsOfServiceUrl: "",
	    contact: "yourname@something.com",
	    license: "",
	    licenseUrl: ""
	});
    app.get('/', function (req, res) {
	    res.sendFile(__dirname + '/dist/index.html');
	});
    // Set api-doc path
	swagger.configureSwaggerPaths('', 'api-docs', '');
	// Set and display the application URL
	var applicationUrl = 'http://localhost' + ':' + PORT;
	swagger.configure(applicationUrl, '1.0.0');
    //for swagger ends here


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//clean the code and get bookRouter from other file
var bookRouter = require('./routes/bookroutes')();
app.use('/api',bookRouter);

//these apis are without router and can be implemented in this way:->
//localhost:3000/
// app.get('/',function(req,res){
//     res.send('welcome to my api');
// });
//localhost:3000/vishal/
app.get('/vishal/',function(req,res){
    res.send('my name is vishal');
});



//Handle form get,post,upload file from testform.html using server
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/testform.html', function (req, res) {
   res.sendFile( __dirname + "/" + "testform.html" );
});

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});



var upload=multer({dest:"tmp/"});
//upl is filename which we have used in testform.html. it should be same here
app.post('/file_upload', upload.single("upl"),function (req, res) {
	
	console.log("req.file\n");
	console.log(req.file);	 
 
   var file = __dirname + "/" + req.file.originalname;
   	console.log(file);	 
   
   fs.readFile( req.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ){
            console.log( err );
            }else{
               response = {
                  message:'File uploaded successfully',
                  filename:req.file.filename
               };
            }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
})

//listening on port
app.listen(PORT,function(){
    console.log('running server using express (app.js) on port'+PORT);
});

module.exports = app;