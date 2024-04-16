const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

const MonitoringActivity = require("../../../models/MonitoringActivity");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let monitoringActivity;
describe("PATCH Monitoring Activity", () => {
  before("adding a Monitoring Activity before beginning the test", (done) => {
    monitoringActivity = MonitoringActivity({
      ...fixture.activityDataTestWithoutID,
    });
    monitoringActivity.save().then(() => done());
  });
  it("Sends a valid request", (done) => {
    request(app)
      .patch("/api/monitoringActivity/" + monitoringActivity._id)
      .send(fixture.activityDataTestWithoutID)
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("activity");
        expect(res.body.data).to.have.property("type");
        expect(res.body.data).to.have.property("description");
        expect(res.body.data._id).to.be.a("string");
        expect(res.body.data._id).to.be.eq(monitoringActivity._id.toString());
        done();
      })
      .catch((err) => done(err));
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .patch("/api/monitoringActivity/" + fixture.wrongID)
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
  });
  // it("Sends an invalid request - no ID", async () => {
  //   const sysClasseWrongId = "60ef4e3f7221301cc8eaafbe";
  //   const res = await request(app)
  //     .patch("/api/sysclass/")
  //     .set("content-type", "application/json")
  //   expect(res.status).to.equal(404);
  // });
  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch("/api/monitoringActivity/" + monitoringActivity._id)
      .set("content-type", "application/json")
      .send({ type: true });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .patch(
        "/api/monitoringActivity/" + monitoringActivity._id + "?param=something"
      )
      .set("content-type", "application/json")
      .send({ type: fixture.activityDataTestWithoutID.type });
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const findOneAndUpdateStub = sinon
      .stub(MonitoringActivity, "findOneAndUpdate")
      .throws(new Error(""));
    const res = await request(app)
      .patch("/api/monitoringActivity/" + fixture.wrongID)
      .set("content-type", "application/json");
    expect(findOneAndUpdateStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneAndUpdateStub.restore();
  });
  after((done) => {
    MonitoringActivity.findByIdAndDelete(monitoringActivity._id).then(() =>
      done()
    );
  });
});
