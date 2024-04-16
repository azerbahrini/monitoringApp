var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

let express = require("express");
var routes = require("../../../routes");
const RoleHistory = require('../../../models/RoleHistory')
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let roleHistory;
describe("GET roleHistory BY  ID ", () => {
  before("adding roleHistory before beginning the test", (done) => {
    roleHistory = new RoleHistory(fixture.roleHistoryDataTestWithoutID);
    roleHistory.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const roleHistoryId = roleHistory._id;
    const res = await request(app)
      .get("/api/roleHistory/" + roleHistoryId)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("user");
    expect(res.body.data).to.have.property("Role");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(roleHistoryId.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const res = await request(app)
        .get("/api/roleHistory/"+fixture.wrongID)
        .set("content-type", "application/json");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("RoleHistory no found");
    });
  });
  after(() => {
    RoleHistory.findByIdAndDelete(roleHistory._id).then(() => done());
  });
});
