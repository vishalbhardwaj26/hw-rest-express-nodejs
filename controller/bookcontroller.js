var bookController = function(Book){
    var post = function(req,res){
         var book = new Book(req.body);
             book.save();//it creates the is as well
             res.status(201);
             res.send(book);
    };
    var get = function(req,res){
        var qu = req.query;
        Book.find(qu,function(err,books){
        if(err)
           console.log("error");
        else
           res.json(books);            
        });
    };

    return {
        post:post,
        get:get
    };

}
module.exports = bookController;