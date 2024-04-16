var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

let express = require("express");
var routes = require("../../../routes");
const app = require("../../../server");
const RoleHistory = require("../../../models/RoleHistory");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let  roleHistory 
describe("GET ALL RoleHistory", () => {
  before("adding RoleHistory before beginning the test", (done) => {
    roleHistory = RoleHistory(fixture.roleHistoryDataTestWithoutID);
    roleHistory.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const res = await request(app)
      .get("/api/roleHistory?page=2&size=2")
      .set("content-type", "application/json");
     
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("Object");
    expect(res.body.data.docs[0]).to.have.property("user");
    expect(res.body.data.docs[0]).to.have.property("Role");
    expect(res.body.data.docs[0]).to.have.property("startDate");
    expect(res.body.data.docs[0]).to.have.property("endDate");
    expect(res.body.data.docs[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/roleHistory/test")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  after(() => {
    RoleHistory.findByIdAndDelete(roleHistory._id).then(() => done());
  });
});


