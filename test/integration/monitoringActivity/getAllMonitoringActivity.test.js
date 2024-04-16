const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const request = require("supertest");

const expect = chai.expect;

const MonitoringActivity = require("../../../models/MonitoringActivity");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let ma;
describe("GET ALL Monitoring Activity", () => {
  before("adding monitoringActivity before beginning the test", (done) => {
    ma = MonitoringActivity(fixture.activityDataTestWithoutID);
    ma.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .get("/api/monitoringActivity")
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data.docs).to.be.a("array");
  });

  it("Sends an invalid request - Wrong Route", async () => {
    const res = await request(app)
      .get("/api/monitoringActivityy")
      .set("content-type", "application/json")
      .send(fixture.emptyTypeDataTest);

    expect(res.status).to.equal(404);
  });

  it("Sends an invalid request - Body Validator Error", async () => {
    const res = await request(app)
      .get("/api/monitoringActivity")
      .set("content-type", "application/json")
      .send({ type: fixture.activityDataTest.type });

    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - Query Validator Error", async () => {
    const res = await request(app)
      .get("/api/monitoringActivity?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });

  it("Expect to throw an Internal Error", async () => {
    let findStub = sinon.stub(MonitoringActivity, "find").throws(new Error(""));
    const res = await request(app)
      .get("/api/monitoringActivity")
      .set("content-type", "application/json");
    expect(findStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findStub.restore();
  });
  after((done) => {
    MonitoringActivity.findByIdAndDelete(ma._id).then(() => done());
  });
});
