var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

let express = require("express");
var routes = require("../../../routes");
const System = require("../../../models/System");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let system;
describe("GET system contact ", () => {
  before("adding system before beginning the test", (done) => {
    system = new System(fixture.SystemDataTestWithoutID);
    system.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const systemId = system._id;
    const res = await request(app)
   
      .get("/api/system/contactList/" + systemId)
      .set("content-type", "application/json")
      .query({});
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("array");
    expect(res.body.data[0]).to.have.property("lastName");
    expect(res.body.data[0]).to.have.property("customer");
    expect(res.body.data[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - ID NOT FOUND", async () => {
    it("Sends a valid Request", async () => {
      const res = await request(app)
        .get("/api/system/contactList/"+fixture.wrongID)
        .set("content-type", "application/json");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("System no found");
    });
  });

  it("Sends an invalid request - INVALID ID", async () => {
    it("Sends a valid Request", async () => {
      const res = await request(app)
        .get("/api/system/contactList/"+444444444444444)
        .set("content-type", "application/json");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("System no found");
    });
  });



  after(() => {
    System.findByIdAndDelete(system._id).then(() => done());
  });
});
