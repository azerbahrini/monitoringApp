var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");
let express = require("express");
var routes = require("../../../routes");
const app = require("../../../server");
const Client = require("../../../models/Client");
const { query } = require("express-validator");

chai.use(sinonChai);
let client;
describe("GET ALL Clients by System", () => {
  before("adding Client before beginning the test", (done) => {
    client = Client({
      clientNumber: 99888,
      system: "610d502489e61a36e88e1d27",
      isActive: true,
    });
    client.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const sysId = client.system;
    const res = await request(app)
      .get("/api/client/AllBySystemID/" + sysId)
      .set("content-type", "application/json")
      .query(query);
    expect(res.status).to.equal(200);

    expect(res.body.data).to.be.a("array");
    expect(res.body).to.include.property("data");
    expect(res.body.data).to.be.a("array");
    expect(res.body.data[0]).to.have.property("system");
    expect(res.body.data[0]).to.have.property("isActive");
    expect(res.body.data[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/client/AllBySystemID/test")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - No System ID", async () => {
    const res = await request(app)
      .get("/api/client/AllBySystemID/")
      .set("content-type", "application/json")
      .send({});
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - No Exist System ID", async () => {
    let sysId = "613f2534ff1edbbe626636b3";
    const res = await request(app).get(`/api/client/AllBySystemID/${sysId}`);
    expect(res.status).to.equal(200);
  });

  after(() => {
    Client.findByIdAndDelete(client._id).then(() => done());
  });
});
