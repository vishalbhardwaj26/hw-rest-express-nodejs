# rest-express-nodejs


## To run it, choose either of it
* run "gulp"  in the direrctory.
* run 'npm start'
* run 'node app.js'
* run 'nodemon app.js' for running it in watch mode//
* you can access it online @ [azure-cloud](https://rest-express-nodejs.azurewebsites.net/)
    * although this won't work optimally as we need mongodb server running locally to connect.
    * So best is to clone it and run it locally on your machine.
### Prerequisiste
* you have to install mongodb locally and run it as server by running
    * C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe
* For cloud mongo db refer my another [git repo](https://github.com/vishalbhardwaj26/helloworld-node-express)


## What else you can learn from it
* restful APIs in nodejs platform (get,post,put,patch,delete)
* node js server without using express. publish pages using http functions
    * run: node appwithoutexpress.
    * Type in browser: localhost:8081/testpage.html
    * You can also access the page from client.js by running "node client"" in another terminal. 
* used express to publish rest APIs
* Plug it with local mongo db server.
* how to use mongoose to define document schema and used it as model
* how to use router route related apis in separate files.
* how to use Middle-ware to remove redundancy in each call for same urls (get,put,post,[atch,delete)
* how to use controllers to further separate out/segregation for tesing
* how to use gulpfile to define few commands
* how to use nodemon to run server in watch mode
* used unit testing/mocking framework (mocha, sinon) 
* how to use end to end integration testing 
* how to run tests using gulp
* used postman to test APIs
* deployed it on azure cloud using web app and accessed through postman with azure url.
* Added Form example accessing get, post, upload-file rest apis
    * Run: node app.js (server using express)
    * Access through loacalhost:3000/testform.html
* npm packages:	
	* bodyParser : to parse the json fromat from rest call
	* gulp: to run few tasks using gulp commands.
	* gulp-mocha: to run few few mocha test related tasks using gulp commands.
	* gulp-nodemon: to use nodemon with gulp; nodemon is to run server in watch mode.
	* mongoose: to access mongodb.
	* mocha- unit test framework
	* should: to have assertion in testing framework
	* sinon: provide mocking and spying framework
	* supertest: to give http call agent; used in integration testing
* Finally added swagger for documenattain and testing apis
    * this was adding swagger to existing project so followed [blog](https://github.com/shawngong/Swagger-Node-Express-For-Existing-APIs)
    * one another way to add swagger to existing project [you tube](https://youtu.be/xggucT_xl5U)
        * includes online tool to conver yaml to json, which consumed by swagger-ui
        * includ gulp task (along with yaml-js package) to convert any changes in yaml to json automatically which get reflected into swagger ui
