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
describe("Delete Client", () => {
  before("create a client before deleting", (done) => {
    tempClient = new Client(fixture.clientDataTestWithoutID);
    tempClient.save().then(() => done());
  });

  it("Sends a valid request", async () => {
    const res = await request(app)
      .patch(`/api/client/delete/${tempClient._id}`)
      .set("content-type", "application/json");
    expect(res.status).to.equal(201);
  });

  it("Sends an Invalid request - non-existing ClientId", async () => {
    const res = await request(app)
      .patch(`/api/client/delete/${fixture.wrongID}`)
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .patch("/api/client/delete/" + tempClient._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  // it("Expect to throw an Internal Error", async () => {
  //   const findOneAndUpdateStub = sinon
  //     .stub(Client, "findOneAndUpdate")
  //     .throws(new Error(""));
  //   const res = await request(app)
  //     .patch("/api/client/delete/" + tempClient._id)
  //     .set("content-type", "application/json");
  //   expect(findOneAndUpdateStub).to.be.calledOnce;
  //   expect(res.status).to.equal(400);
  //   findOneAndUpdateStub.restore();
  // });

  after((done) => {
    Client.findByIdAndDelete(tempClient._id).then(() => done());
  });
});
