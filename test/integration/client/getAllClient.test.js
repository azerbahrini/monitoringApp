var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

let express = require("express");
var routes = require("../../../routes");
const app = require("../../../server");
const Client = require("../../../models/Client");

chai.use(sinonChai);
let client;
describe("GET ALL Clients", () => {
  before("adding Client before beginning the test", (done) => {
    client = Client({ clientNumber: 100, isActive: true });
    client.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    let query = {
      page : 0,
      size : 1
    }
    const res = await request(app)
      .get("/api/client/")
      .set("content-type", "application/json")
      .query(query);
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data.docs).to.be.a("array");
    expect(res.body.data.docs[0]).to.have.property("clientNumber");
    expect(res.body.data.docs[0]).to.have.property("isActive");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/client/test")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  after(() => {
    Client.findByIdAndDelete(client._id).then(() => done());
  });
});
