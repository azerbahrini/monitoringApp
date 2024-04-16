const sinon = require("sinon");
const expect = require("chai").expect;
var chai = require("chai");
chai.use(require("sinon-chai"));
const fixture = require("../fixture.json");
const mTypeController = require("../../../../controllers/monitoringType.controller");
const mTypeService = require("../../../../services/monitoringType");

describe("controller DELETE Monitoring Type ", () => {
  let stubDelete;
  beforeEach(() => {
    stubDelete = sinon.stub(mTypeService, "deleteMonitoringType");
  });
  afterEach(() => {
    stubDelete.restore();
  });
  it("expect to return new type ", async () => {
    stubDelete.returns({
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
    await mTypeController.deleteIMonitoringType(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.typeDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubDelete.returns({
      err: { message: "host not found" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: { ...fixture.typeDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mTypeController.deleteIMonitoringType(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "host not found",
    });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubDelete.returns({
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
    await mTypeController.deleteIMonitoringType(req, res);
    expect(stubDelete).to.be.calledWith(fixture.wrongID);
  });
});
