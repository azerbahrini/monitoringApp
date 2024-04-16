/* eslint-disable capitalized-comments */
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");
var rewire = require("rewire");
let express = require("express");
var routes = require("../../../routes");
const chaiHttp = require("chai-http");
const bodyParser = require("body-parser");
const RoleHistory = require("../../../models/RoleHistory");

const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);

let roleHistory;
describe("Update RoleHistory", () => {
  before("create a RoleHistory before test", (done) => {
    roleHistory = new RoleHistory(fixture.roleHistoryDataTestWithoutID);
    roleHistory.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .patch(`/api/roleHistory/update/${roleHistory._id}`)
      .set("content-type", "application/json")
      .send(fixture.roleHistoryDataTestWithoutID);
    expect(res.status).to.equal(201);
  });

  it("Sends an Invalid reequest - non-existing RoleHistoryId", async () => {
    const res = await request(app)
      .patch(`/api/roleHistory/update/${fixture.wrongID}`)
      .set("content-type", "application/json")
      .send(fixture.roleHistoryDataTestWithoutID);
    expect(res.status).to.equal(404);
  });

  it("Error in Try - invalid  id", async () => {
    const res = await request(app)
      .patch(`/api/roleHistory/update/111`)
      .set("content-type", "application/json")
      .send(fixture.roleHistoryDataTestWithoutID);

    expect(res.status).not.to.be.equal(201);
  });


  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch(`/api/roleHistory/update/${roleHistory._id}`)
      .set("content-type", "application/json")
      .send({user: true });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validator Error", async () => {
    const res = await request(app)
      .patch(`/api/roleHistory/update/${roleHistory._id}?param=somthing`)
      .set("content-type", "application/json")
      .send(fixture.roleHistoryDataTestWithoutID);
    expect(res.status).to.equal(400);
  });
  after((done) => {
    RoleHistory.findByIdAndDelete(roleHistory._id).then(() => done());
  });
});
