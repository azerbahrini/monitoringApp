const sinon = require("sinon");
const expect = require("chai").expect;
var chai = require("chai");
chai.use(require("sinon-chai"));
const fixture = require("../fixture.json");
const MonitoringTypeController = require("../../../../controllers/monitoringType.controller");
const MonitoringTypeService = require("../../../../services/monitoringType");

describe("controller UPDATE monitoring type test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(MonitoringTypeService, "updateMonitoringType");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new type ", async () => {
    stubUpdate.returns({
      data: fixture.typeDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.typeDataTest },
      params: { id: fixture.typeDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await MonitoringTypeController.updateMonitoringType(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.typeDataTest,
    });
  });
  it("it should throw an error ", () => {});

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "Monitoring Type not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.typeDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await MonitoringTypeController.updateMonitoringType(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "Monitoring Type not found",
    });
  });

  it("expect to return an error - not sending the statusCode ", async () => {
    stubUpdate.returns({
      err: { message: "Monitoring Type not found" },
      status: "error",
      // statusCode: 404, not sending the statusCode
    });
    let req = {
      body: { ...fixture.typeDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await MonitoringTypeController.updateMonitoringType(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Monitoring Type not found",
    });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubUpdate.returns({
      err: { message: "invalidStatus" },
      status: "invalidStatus",
      statusCode: 400,
    });
    let req = {
      body: { ...fixture.typeDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await MonitoringTypeController.updateMonitoringType(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: "60ee0042d9b53b3e084209f6" });
  });
});
