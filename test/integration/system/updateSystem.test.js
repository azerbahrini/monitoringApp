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
const System = require("../../../models/System");

const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);

let system;
describe("Update System", () => {
  before("create a system before test", (done) => {
    system = new System(fixture.SystemDataTestWithoutID);
    system.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .patch(`/api/system/update/${system._id}`)
      .set("content-type", "application/json")
      .send(fixture.SystemDataTestWithoutID);
    expect(res.status).to.equal(201);
  });

  it("Sends an Invalid reequest - non-existing SystemId", async () => {
    const res = await request(app)
      .patch(`/api/system/update/${fixture.wrongID}`)
      .set("content-type", "application/json")
      .send(fixture.SystemDataTestWithoutID);
    expect(res.status).to.equal(404);
  });

  it("Error in Try - invalid  id", async () => {
    const res = await request(app)
      .patch(`/api/system/update/111`)
      .set("content-type", "application/json")
      .send(fixture.SystemDataTestWithoutID);

    expect(res.status).to.equal(400);
  });


  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch(`/api/system/update/${system._id}`)
      .set("content-type", "application/json")
      .send({Test: "ok" });
    expect(res.status).to.equal(400);
  });
  
  it("Sends an invalid request - Query Validator Error", async () => {
    const res = await request(app)
      .patch(`/api/system/update/${system._id}?param=somthing`)
      .set("content-type", "application/json")
      .send(fixture.SystemDataTestWithoutID);
    expect(res.status).to.equal(400);
  });
  after((done) => {
    System.findByIdAndDelete(system._id).then(() => done());
  });
});
