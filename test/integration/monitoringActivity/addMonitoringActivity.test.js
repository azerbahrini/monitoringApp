const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const MonitoringActivity = require("../../../models/MonitoringActivity");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let id;
describe("Add Monitoring Activity", () => {
  it("Sends a valid request", async () => {
    const res = await request(app)
      .post("/api/monitoringActivity")
      .set("content-type", "application/json")
      .send(fixture.activityDataTestWithoutID);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("activity");
    expect(res.body.data).to.have.property("type");
    expect(res.body.data).to.have.property("description");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - Empty Body", async () => {
    const res = await request(app)
      .post("/api/monitoringActivity")
      .set("content-type", "application/json")
      .send(fixture.emptyActivityDataTest);

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Missing Property", async () => {
    const res = await request(app)
      .post("/api/monitoringActivity")
      .set("content-type", "application/json")
      .send({ isActive: fixture.activityDataTest.active });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .post("/api/monitoringActivity?param=something")
      .set("content-type", "application/json")
      .send(fixture.activityDataTestWithoutID);
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const createStub = sinon
      .stub(MonitoringActivity, "create")
      .throws(new Error(""));
    const res = await request(app)
      .post("/api/monitoringActivity")
      .set("content-type", "application/json")
      .send(fixture.activityDataTestWithoutID);
    expect(createStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    createStub.restore();
  });
  after((done) => {
    MonitoringActivity.findByIdAndDelete(id).then(() => done());
  });
});
