var express = require('express');

//get a new model for schema playing in mongo db
var Book = require('../models/bookModel');

//using router makes code clean for creating rest ful apis

var routes = function(){
    

            var bookRouter = express.Router();

            bookRouter.route('/Books')
            .post(function(req,res){
                console.log(req.body);
            
                var book = new Book(req.body);
                book.save();//it creates the is as well
                res.status(201).send(book);
            })
            .get(function(req,res){
                 //localhost:3000\api\books
                //localhost:3000\api\books?author=vishal
                var qu = req.query;
                Book.find(qu,function(err,books){
                    if(err)
                    console.log("error");
                    else
                    res.json(books);

                });
            });

            //localhost:3000\api\books\595b52381139a8077c9bf407
            bookRouter.route('/Books/:bookId')
            .get(function(req,res){
                Book.findById(req.params.bookId,function(err,books){        
                    if(err)
                    console.log("error");
                    else
                    res.json(books);
                });
            });

             //localhost:3000\api\
            bookRouter.route('/')
            .get(function(req,res){
               
                    res.json({"Title":"these are apis"});
                
            });

            return bookRouter;

};

module.exports = routes;