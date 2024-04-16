const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let Map = require("../../../models/MonitoringActivityPlannification");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let map;
describe("GET BY ID map", () => {
  before("adding map before beginning the test", (done) => {
    map = new Map(fixture.mapTest);
    map.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .get("/api/map/" + map._id)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("periodicity");
    expect(res.body.data).to.have.property("active");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(map._id.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .get("/api/map/" + fixture.wrongId)
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
    expect(res.body.message).to.be.a("string");
    expect(res.body.message).to.be.eq("MAP not found");
  });
  it("Send an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .get("/api/map/" + map._id)
      .set("content-type", "application/json")
      .send({ periodicity: 30 });
    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .get("/api/map/" + map._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const findOneStub = sinon.stub(Map, "findOne").throws(new Error(""));
    const res = await request(app)
      .get("/api/map/" + fixture.wrongId)
      .set("content-type", "application/json");
    expect(findOneStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneStub.restore();
  });
  after(() => {
    Map.findByIdAndDelete(map._id).then(() => done());
  });
});
