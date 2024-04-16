const sinon = require("sinon");
const expect = require("chai").expect;
var chai = require("chai");
chai.use(require("sinon-chai"));
const fixture = require("../fixture.json");
const monitoringTypeController = require("../../../../controllers/monitoringType.controller");
const monitoringTypeService = require("../../../../services/monitoringType");

describe("controller GET ALL Monitoring Types test ", () => {
  let stubGetAll;
  beforeEach(() => {
    stubGetAll = sinon.stub(
      monitoringTypeService,
      "getAllMonitoringTypeService"
    );
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it("expect to send all Monitoring Types", async () => {
    stubGetAll.returns({
      data: fixture.arrayOfTypes,
      status: "success",
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringTypeController.getAllMonitoringType(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayOfTypes,
    });
  });

  it("expect to return an error 400", async () => {
    stubGetAll.returns({
      status: "error",
      err: { message: "failed to return the data" },
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringTypeController.getAllMonitoringType(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res).to.be.a("object");
    expect(res).to.have.property("json");
    expect(res).to.have.property("status");
    expect(res.json).be.calledWith({ message: "failed to return the data" });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubGetAll.returns({
      err: { message: "invalidStatus" },
      status: "invalidStatus",
      statusCode: 400,
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringTypeController.getAllMonitoringType(req, res);
    expect(stubGetAll).to.be.calledOnce;
  });
});
