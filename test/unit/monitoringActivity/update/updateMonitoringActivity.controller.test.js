const sinon = require("sinon");
const expect = require("chai").expect;
var chai = require("chai");
chai.use(require("sinon-chai"));
const fixture = require("../fixture.json");
const monitoringActivityController = require("../../../../controllers/monitoringActivity.controller");
const monitoringActivityService = require("../../../../services/monitoringActivity");

describe("controller UPDATE Monitoring Activity test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(
      monitoringActivityService,
      "updateMonitoringActivityService"
    );
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new Monitoring Activity ", async () => {
    stubUpdate.returns({
      data: fixture.activityDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.activityDataTest },
      params: { id: fixture.activityDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringActivityController.updateMonitoringActivity(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.activityDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "Monitoring Activity not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.activityDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringActivityController.updateMonitoringActivity(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "Monitoring Activity not found",
    });
  });

  it("expect to return an error - not sending the statusCode", async () => {
    stubUpdate.returns({
      err: { message: "Monitoring Activity not found" },
      status: "error",
      // statusCode: 400,
    });
    let req = {
      body: { ...fixture.activityDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringActivityController.updateMonitoringActivity(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Monitoring Activity not found",
    });
  });
});
