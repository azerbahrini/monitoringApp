var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

let express = require("express");
var routes = require("../../../routes");
const Client = require('../../../models/Client')
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let tempClient;
describe("GET BY CLIENT ID ", () => {
  before("adding client before beginning the test", (done) => {
    tempClient = new Client(fixture.clientDataTestWithoutID);
    tempClient.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const clientId = tempClient._id;
    const res = await request(app)
      .get("/api/client/" + clientId)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("clientNumber");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(clientId.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const clientId = fixture.wrongID;
      const res = await request(app)
        .get("/api/client/" + clientId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("Client no found");
    });
  });
  after(() => {
    Client.findByIdAndDelete(tempClient._id).then(() => done());
  });
});
