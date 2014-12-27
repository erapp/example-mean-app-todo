var superagent = require('superagent')
var expect = require('expect.js')

describe('express rest api server', function(){
  var id

  it('post object', function(done){
    superagent.post('http://localhost:3000/todos')
      .send({ name: 'Test Task',
		completed: false,
		note: 'Test Note'
      })
      .end(function(e,res){
		//console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body._id.length).to.eql(24)
		id = res.body._id
		//console.log(id);
        done()
      });    
  })

  it('retrieves an object', function(done){
    superagent.get('http://localhost:3000/todos/'+id)
      .end(function(e, res){
        //console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)        
        expect(res.body._id).to.eql(id)        
        done()
      })
  })

  it('retrieves a collection', function(done){
    superagent.get('http://localhost:3000/todos')
      .end(function(e, res){
        //console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.be.above(0)
        expect(res.body.map(function (item){return item._id})).to.contain(id)        
        done()
      })
  })

  it('updates an object', function(done){
    superagent.put('http://localhost:3000/todos/'+id)
      .send({name: 'Test Task 2',
		complete: false,
		note: 'Test Note 2'
	  })
      .end(function(e, res){
        //console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.name).to.eql('Test Task 2')        
        done()
      })
  })
  
  it('checks an updated object', function(done){
    superagent.get('http://localhost:3000/todos/'+id)
      .end(function(e, res){
        //console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)        
        expect(res.body._id).to.eql(id)        
        expect(res.body.name).to.eql('Test Task 2')        
        done()
      })
  })    
  
  it('removes an object', function(done){
    superagent.del('http://localhost:3000/todos/'+id)
      .end(function(e, res){
        //console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        //expect(res.body.msg).to.eql('success')
		expect(res.body.name).to.eql('Test Task 2')    
        done()
      })
  })      
})