const sinon = require("sinon");
const expect = require("chai").expect;
var chai = require("chai");
chai.use(require("sinon-chai"));
const fixture = require("../fixture.json");
const monitoringActivityController = require("../../../../controllers/monitoringActivity.controller");
const monitoringActivityService = require("../../../../services/monitoringActivity");
const MonitoringActivity = require("../../../../models/MonitoringActivity");
describe("controller GET ALL Monitoring Activity test ", () => {
  let stubGetAll;
  let paginateStub;
  beforeEach(() => {
    stubGetAll = sinon.stub(
      monitoringActivityService,
      "getAllMonitoringActivityService"
    );
    paginateStub = sinon.stub(MonitoringActivity, "paginate");
  });
  afterEach(() => {
    stubGetAll.restore();
    paginateStub.restore();
  });

  it("expect to send all Monitoring Activities", async () => {
    stubGetAll.returns({
      data: fixture.getAllPaignateMonitoringActivities,
      status: "success",
    });
    let req = {
      body: {},
      params: {},
      query: {
        paginate: true,
        page: 2,
        size: 5,
      },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringActivityController.getAllactivities(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.getAllPaignateMonitoringActivities,
    });
  });

  it("expect to return an Error", async () => {
    stubGetAll.returns({
      status: "error",
      err: { message: "failed to return the data" },
    });
    let req = {
      body: {},
      params: {},
      query: {
        paginate: true,
        page: 2,
        size: 5,
      },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringActivityController.getAllactivities(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res).to.be.a("object");
    expect(res).to.have.property("json");
    expect(res).to.have.property("status");
    expect(res.json).be.calledWith({ message: "failed to return the data" });
  });
});
