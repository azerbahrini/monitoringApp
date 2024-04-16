var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");
let express = require("express");
var routes = require("../../../routes");
const app = require("../../../server");
const ItOperation = require("../../../models/ItOperation");
const { query } = require("express-validator");

chai.use(sinonChai);
let itOperation;
describe("GET ALL ItOperations by System", () => {
  before("adding ItOperation before beginning the test", (done) => {
    itOperation = ItOperation({
      title: "title",
      description: "description",
      timeZone: "timeZone",
      startDate: "2021-08-06T15:35:12.193+00:00",
      endDate: "2021-08-06T15:35:12.193+00:00",
      spoc: "610d502489e61a36e88e1d27",
      system: "610d502489e61a36e88e1d27",
      type: "planned",
      ticket: "ticket",
    });
    itOperation.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    let query = {
      page: 0,
      size: 30,
    };
    const sysId = itOperation.system;

    const res = await request(app)
      .get("/api/itOperation/AllItOperationBySystemID/" + sysId)
      .set("content-type", "application/json")
      .query(query);

    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.include.property("docs");
    expect(res.body.data.docs).to.be.a("array");
    expect(res.body.data.docs[0]).to.have.property("system");
    expect(res.body.data.docs[0]).to.have.property("spoc");
    expect(res.body.data.docs[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app).get(
      "/api/itOperation/AllItOperationBySystemID/test"
    );

    expect(res.status).to.equal(400);
  });

  // it("Sends an invalid request - No System ID", async () => {
  //   const res = await request(app)
  //     .get("/api/itOperation/AllItOperationBySystemID/")
  //     .set("content-type", "application/json")
  //     .send({});

  //   expect(res.status).to.equal(404);
  // });
  it("Sends an invalid request - No Exist System ID", async () => {
    let sysId = "613f2534ff1edbbe626636c3";
    const res = await request(app).get(
      `/api/itOperation/AllItOperationBySystemID/${sysId}`
    );
    expect(res.status).to.equal(404);
  });

  after(() => {
    ItOperation.findByIdAndDelete(itOperation._id).then(() => done());
  });
});
