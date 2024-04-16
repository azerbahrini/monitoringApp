const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const monitoringActivityController = require("../../../../controllers/monitoringActivity.controller");
const monitoringActivityService = require("../../../../services/monitoringActivity");
describe("controller POST Monitoring Activity test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(
      monitoringActivityService,
      "addMonitoringActivityService"
    );
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct Monitoring Activity object ", async () => {
    stubAdd.returns({
      data: fixture.activityDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.activityDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringActivityController.addActivity(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.activityDataTest,
    });
  });
  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { type: fixture.activityDataTest.type },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringActivityController.addActivity(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
