var should = require('should');
var sinon = require('sinon');

describe('book tests', function(){
    describe('book controller tests',function(){
        it('test post request',function(){

            //mocking to pass as argument
            var Book = function(book){this.save = function(){}};
            
            var bookController = require('../controller/bookController')(Book);

            var req = {body:{author:"vishal"}};//mocking to pass as argument
            var res = {status: sinon.spy(),  //mocking and spying this object to check in call
                        send: sinon.spy()
                        };
            bookController.post(req,res);
            res.status.calledWith(201).should.equal(true,'right');
            res.send.calledOnce.should.equal(true);
            


        });

    });
});