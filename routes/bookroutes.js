var express = require('express');

//get a new model for schema playing in mongo db
var Book = require('../models/bookModel');

//using router makes code clean for creating rest ful apis

var routes = function(){ 

            //using controller separate class for making post and get functions
            var bookController = require('../controller/bookcontroller')(Book);

            var bookRouter = express.Router();
            bookRouter.route('/Books')
            .post(bookController.post) //insteatd of argument - function(req,res){}
            .get(bookController.get)

//Moved this implementaion to separate class: bookController.js
            // .post(function(req,res){
            //     console.log(req.body);
            
            //     var book = new Book(req.body);
            //     book.save();//it creates the is as well
            //     res.status(201).send(book);
            // })
            // .get(function(req,res){
            //      //localhost:3000\api\books
            //     //localhost:3000\api\books?author=vishal
            //     var qu = req.query;
            //     Book.find(qu,function(err,books){
            //         if(err)
            //         console.log("error");
            //         else
            //         res.json(books);

            //     });
           

            //Midlleware for all calls initialte with /Books/:bookId
            bookRouter.use('/Books/:bookId',function(req,res,next){
                Book.findById(req.params.bookId,function(err,books){        
                    if(err)
                    {
                        res.status(500).send("error");
                    }
                    else if(books){
                        req.book = books;
                        next();//forward rest call to further in (get,put,)
                    }
                    else
                    res.status(400).send("No Book");
                });
            });

            //localhost:3000\api\books\595b52381139a8077c9bf407
            bookRouter.route('/Books/:bookId')
            .get(function(req,res){
                // Book.findById(req.params.bookId,function(err,books){        
                //     if(err)
                //     console.log("error");
                //     else
                //     res.json(books);
                // });

                res.json(req.book);
            })
            //modify existing book
            .put(function(req,res){
                // Book.findById(req.params.bookId,function(err,books){        
                //     if(err)
                //     console.log("error");
                //     else if(books){
                //         var inBook = new Book(req.body);
                //         books.title = inBook.title;
                //         books.author = inBook.author;
                //         books.read = inBook.read;
                //         books.save();
                //     res.json(books);
                // }
                // else{
                //     res.send("no book");
                // }
                // });
                var inBook = new Book(req.body);
                req.book.title = inBook.title;
                req.book.author = inBook.author;
                req.book.read = inBook.read;
                req.book.save(function(err){
                    res.send(req.book);

                });
            })
            //update only part of book
            .patch(function(req,res){
                if(req.body._id){
                    delete req.body._id;
                }
                for(var p in req.body){
                    req.book[p] = req.body[p];
                }
                req.book.save(function(err){
                    res.send(req.book);
                });
            })
            .delete(function(req,res){
                req.book.remove(function(err){
                    if(err){
                        res.send('error');
                    }
                    else{
                        res.status(204).send('removed');
                    }
                });
            });

             //localhost:3000\api\ - just to test deployment on axure
            bookRouter.route('/')
            .get(function(req,res){
               
                    res.json({"Title":"these are apis"});
                
            });

            return bookRouter;

};

module.exports = routes;