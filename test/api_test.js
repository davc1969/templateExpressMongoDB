process.env.NODE_ENV = "test";
const envPath = __dirname + "/../src/.env";
console.log("nv path", envPath);
require('dotenv').config({path:envPath})

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/index")

chai.should();
chai.use(chaiHttp);


describe("testing API application", () => {

    //first test: get welcome page
    describe("GET api/1.0", () => {
        it("test welcome api route...", (done) => {
            chai.request(server)
            .get("/api/1.0")
            .end( (err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                console.log(res.message);
                done()
            })
        })
    }),

    //first test: get welcome page
    describe("GET api/1.0/payments", () => {
        it("test welcome api route...", (done) => {
            chai.request(server)
            .get("/api/1.0/payments")
            .end( (err, res) => {
                res.should.have.status(403);
                res.body.should.be.a("object");
                console.log(res.message);
                done()
            })
        })
    })
    
})