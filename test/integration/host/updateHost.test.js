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
const Host = require("../../../models/Host");

const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);

let tempHost;
describe("Update Host", () => {
  before("create a host before deleting", (done) => {
    tempHost = new Host({
      ...fixture.hostDataTestWithoutID,
    });
    tempHost.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .patch(`/api/host/update/${tempHost._id}`)
      .set("content-type", "application/json")
      .send(fixture.hostDataTestWithoutID);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("host");
    expect(res.body.data).to.have.property("isActive");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(tempHost._id.toString());
    
  });

  it("Sends an Invalid reequest - non-existing HostId", async () => {
    const res = await request(app)
      .patch(`/api/host/update/${fixture.wrongID}`)
      .set("content-type", "application/json")
      .send(fixture.hostDataTestWithoutID);
    expect(res.status).to.equal(404);
  });

  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch(`/api/host/update/${tempHost._id}`)
      .set("content-type", "application/json")
      .send({ host: true });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validator Error", async () => {
    const res = await request(app)
      .patch(`/api/host/update/${tempHost._id}?param=somthing`)
      .set("content-type", "application/json")
      .send(fixture.emptyHostDataTest);
    expect(res.status).to.equal(400);
  });
  after((done) => {
    Host.findByIdAndDelete(tempHost._id).then(() => done());
  });
});
