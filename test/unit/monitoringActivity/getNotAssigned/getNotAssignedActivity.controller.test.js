const sinon = require("sinon");
const expect = require("chai").expect;
var chai = require("chai");
chai.use(require("sinon-chai"));
const fixture = require("../fixture.json");
const monitoringActivityController = require("../../../../controllers/monitoringActivity.controller");
const monitoringActivityService = require("../../../../services/monitoringActivity");

describe("controller GET Not Assigned Monitoring Activity test ", () => {
  let stubGetNotAssigned;
  beforeEach(() => {
    stubGetNotAssigned = sinon.stub(
      monitoringActivityService,
      "getNotAssignedActivityService"
    );
  });
  afterEach(() => {
    stubGetNotAssigned.restore();
  });
  it("expect to send  Not Assigned Monitoring Activities", async () => {
    stubGetNotAssigned.returns({
      data: fixture.arrayofActivities,
      status: "success",
    });
    let req = { body: {}, params: { ...fixture.systemID } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringActivityController.getNotAssignedActivity(req, res);
    expect(stubGetNotAssigned).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofActivities,
    });
  });

  it("expect to return an error invalidStatus", async () => {
    stubGetNotAssigned.returns({
      status: "invalidStatus",
      err: { message: "failed to return the data" },
      statusCode: 400,
    });
    let req = { body: {}, params: { ...fixture.systemID } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringActivityController.getNotAssignedActivity(req, res);
    expect(stubGetNotAssigned).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res).to.be.a("object");
    expect(res).to.have.property("json");
    expect(res).to.have.property("status");
    expect(res.json).be.calledWith({ message: "failed to return the data" });
  });

  it("expect to return an error invalidStatus + not sending statusCode", async () => {
    stubGetNotAssigned.returns({
      err: { message: "failed to return the data" },
      status: "invalidStatus",
    });
    let req = { body: {}, params: { ...fixture.systemID } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringActivityController.getNotAssignedActivity(req, res);
    expect(stubGetNotAssigned).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res).to.be.a("object");
    expect(res).to.have.property("json");
    expect(res).to.have.property("status");
    expect(res.json).be.calledWith({ message: "failed to return the data" });
  });
});
