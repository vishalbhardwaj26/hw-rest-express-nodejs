var should = require('should'),
app = require('../app');
var agent = require('supertest').agent(app);
//var agent = request.agent(app);
var Book = require('../models/bookModel');

describe('Post integration test', function(){
it('post test',function(done){
    
    agent.post('/api/books')
    .send({title:'my vodafone', author:'vodafone'})
    .expect(500)
    .end(function(err,result){
        result.body.read.should.equal(false);
        result.body.should.have.property('_id');
        result.status.should.equal(201);
        done();

    });

});

afterEach(function(done){
Book.remove().exec();
done();
});
});