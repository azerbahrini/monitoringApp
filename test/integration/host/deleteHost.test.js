/* eslint-disable capitalized-comments */
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

const Host = require("../../../models/Host");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);

let tempHost;
describe("Delete Host", () => {
  before("create a host before deleting", (done) => {
    tempHost = new Host(fixture.hostDataTestWithoutID);
    tempHost.save().then(() => done());
  });

  it("Sends a valid request", async () => {
    const res = await request(app)
      .patch(`/api/host/delete/${tempHost._id}`)
      .set("content-type", "application/json")
      .send({
        ...fixture.hostDataTestWithoutID,
        deleted_at: Date.now(),
      });
    expect(res.status).to.equal(204);
  });

  it("Sends an Invalid request - non-existing HostId", async () => {
    const res = await request(app)
      .patch(`/api/host/delete/${fixture.wrongID}`)
      .set("content-type", "application/json")
      .send({
        ...fixture.hostDataTestWithoutID,
        deleted_at: Date.now(),
      });
    expect(res.status).to.equal(404);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .patch("/api/host/delete/" + tempHost._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const findOneAndUpdateStub = sinon
      .stub(Host, "findOneAndUpdate")
      .throws(new Error(""));
    const res = await request(app)
      .patch("/api/host/delete/" + tempHost._id)
      .set("content-type", "application/json");
    expect(findOneAndUpdateStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneAndUpdateStub.restore();
  });

  after((done) => {
    Host.findByIdAndDelete(tempHost._id).then(() => done());
  });
});
