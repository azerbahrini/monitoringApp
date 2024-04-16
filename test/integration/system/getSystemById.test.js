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
describe("GET system BY  ID ", () => {
  before("adding system before beginning the test", (done) => {
    system = new System(fixture.SystemDataTestWithoutID);
    system.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const systemId = system._id;
    const res = await request(app)
      .get("/api/system/" + systemId)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("name");
    expect(res.body.data).to.have.property("customer");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(systemId.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const res = await request(app)
        .get("/api/system/"+fixture.wrongID)
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
