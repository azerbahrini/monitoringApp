/* eslint-disable capitalized-comments */
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

const Client = require("../../../models/Client");

const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);

let tempClient;
describe("Update Client", () => {
  before("create a client before deleting", (done) => {
    tempClient = new Client({
      clientNumber:100,
      isActive:true,
      system : "61269e382d616e9a1f6b8ca1"
  });
    tempClient.save().then(() => done());
  });

  it("Sends a valid request", async () => {
    const res = await request(app)
      .patch(`/api/client/update/${tempClient._id}`)
      .set("content-type", "application/json")
      .send({
        clientNumber:110,
    });
    expect(res.status).to.equal(201);
  });

  it("Sends an Invalid reequest - non-existing ClientId", async () => {
    const res = await request(app)
      .patch(`/api/client/update/${fixture.wrongID}`)
      .set("content-type", "application/json")
      .send(fixture.clientDataTestWithoutID);
    expect(res.status).to.equal(404);
  });

  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch(`/api/client/update/${tempClient._id}`)
      .set("content-type", "application/json")
      .send({ clientNumber: true });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validator Error", async () => {
    const res = await request(app)
      .patch(`/api/client/update/${tempClient._id}?param=somthing`)
      .set("content-type", "application/json")
      .send(fixture.emptyClientDataTest);
    expect(res.status).to.equal(400);
  });
  after((done) => {
    Client.findByIdAndDelete(tempClient._id).then(() => done());
  });
});
