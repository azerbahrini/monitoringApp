var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");
let express = require("express");
var routes = require("../../../routes");
const app = require("../../../server");
const Host = require("../../../models/Host");

chai.use(sinonChai);
let host;
describe("GET ALL Hosts by System", () => {
  before("adding Host before beginning the test", (done) => {
    host = Host({
      host: "sysclas test",
      isActive: true,
      system: "608be0f0c5a2a0bd397294aa",
    });
    host.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const sysId = host.system;
    const res = await request(app)
      .get("/api/host/getBySystem/" + sysId)
      .set("content-type", "application/json");

    expect(res.status).to.equal(200);

    expect(res.body.data).to.be.a("array");
    expect(res.body).to.include.property("data");
    expect(res.body.data).to.be.a("array");
    expect(res.body.data[0]).to.have.property("host");
    expect(res.body.data[0]).to.have.property("isActive");
    expect(res.body.data[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/host/getBySystem/test")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - No System ID", async () => {
    const res = await request(app)
      .get("/api/host/getBySystem/")
      .set("content-type", "application/json")
      .send({});
    expect(res.status).to.equal(400);
  });

  after(() => {
    Host.findByIdAndDelete(host._id).then(() => done());
  });
});
