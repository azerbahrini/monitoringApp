var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

let express = require("express");
var routes = require("../../../routes");
const app = require("../../../server");
const System = require("../../../models/System");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let  system 
describe("GET ALL System", () => {
  before("adding System before beginning the test", (done) => {
    system = System(fixture.SystemDataTestWithoutID);
    system.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const res = await request(app)
      .get("/api/system?page=1&size=1")
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.a("Object");
    
    expect(res.body.data.docs[0]).to.have.property("name");
    expect(res.body.data.docs[0]).to.have.property("customer");
    expect(res.body.data.docs[0]).to.have.property("category");
    expect(res.body.data.docs[0]).to.have.property("type");
    expect(res.body.data.docs[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/system/test")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  after(() => {
    System.findByIdAndDelete(system._id).then(() => done());
  });
});


