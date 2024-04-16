const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const MAP = require("../../../models/MonitoringActivityPlannification");

const app = require("../../../server");
const fixture = require("./fixture.json");
chai.use(sinonChai);
let map;

// delete  = patch
describe("DELETE map", () => {
  before("Create map before deleting", (done) => {
    map = new MAP(fixture.mapTest);
    map.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .patch("/api/map/delete/" + map._id)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("task");
    expect(res.body.data).to.have.property("active");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(map._id.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .patch("/api/map/delete/" + fixture.wrongId)
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
  });

  it("Sends an invalid request - Missing ID", async () => {
    const res = await request(app)
      .patch(`/api/map/delete/`)
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });

  it("Expect to throw an Internal Error", async () => {
    const findOneAndRemoveStub = sinon
      .stub(MAP, "findOneAndUpdate")
      .throws(new Error(""));
    const res = await request(app)
      .patch("/api/map/delete/" + map._id)
      .set("content-type", "application/json");
    expect(findOneAndRemoveStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneAndRemoveStub.restore();
  });
  after((done) => {
    MAP.findByIdAndDelete(map._id).then(() => done());
  });
});
