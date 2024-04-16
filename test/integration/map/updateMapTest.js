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
describe("PATCH map", () => {
  before("adding a map before beginning the test", (done) => {
    map = MAP(fixture.mapTest);
    map.save().then(() => done());
  });
  it("Sends a valid request", (done) => {
    map._id;

    request(app)
      .patch("/api/map/" + map._id.toString())
      .send(fixture.mapTest)
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("periodicity");
        expect(res.body.data).to.have.property("active");
        expect(res.body.data._id).to.be.a("string");
        done();
      })
      .catch((err) => done(err));
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .patch("/api/map/" + fixture.wrongId)
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
  });

  it("Sends an invalid request - Missing ID", async () => {
    let id = null;
    const res = await request(app)
      .patch(`/api/map/${id}`)
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch("/api/map/" + map._id)
      .set("content-type", "application/json")
      .send({ active: "eerer" });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .patch("/api/map/")
      .set("content-type", "application/json")
      .send({ periodicity: fixture.mapTest.periodicity });
    expect(res.status).to.equal(404);
  });
  it("Expect to throw an Internal Error", async () => {
    const findOneAndUpdateStub = sinon
      .stub(MAP, "findOneAndUpdate")
      .throws(new Error(""));
    const res = await request(app)
      .patch("/api/map/" + fixture.wrongId)
      .set("content-type", "application/json");
    expect(findOneAndUpdateStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneAndUpdateStub.restore();
  });
  after((done) => {
    MAP.findByIdAndDelete(map._id).then(() => done());
  });
});
