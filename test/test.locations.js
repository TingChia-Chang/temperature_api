const chai = require('chai')
const supertest = require("supertest")
const agent = supertest.agent(require('../app'));
var should = chai.should();

it('valid zipcode without scale', done =>{
    agent.get("/locations/24060").end((err,res)=>{
        res.status.should.be.equal(200);
        (res.body).should.have.property("temperature");
        (res.body.temperature).should.be.a("number");
        (res.body).should.have.property("scale");
        (res.body.scale).should.equal("Fahrenheit");
        done();
    })
});

it('valid zipcode with scale', done =>{
    agent.get("/locations/24060").query({scale:"Celsius"}).end((err,res)=>{
        res.status.should.be.equal(200);
        (res.body).should.have.property("temperature");
        (res.body.temperature).should.be.a("number");
        (res.body).should.have.property("scale");
        (res.body.scale).should.equal("Celsius");
        done();
    })
});

it('invalid zipcode', done =>{
    agent.get("/locations/00000").end((err,res)=>{
        res.status.should.be.equal(404);
        (res.body).should.have.property("cod");
        (res.body.cod).should.equal("404");
        (res.body).should.have.property("message");
        (res.body.message).should.equal("city not found");
        done();
    })
});

