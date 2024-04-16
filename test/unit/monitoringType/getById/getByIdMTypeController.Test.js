const sinon = require("sinon");
const expect = require("chai").expect;
var chai = require("chai");
chai.use(require("sinon-chai"));
const fixture = require("../fixture.json");
const mTypeController = require("../../../../controllers/monitoringType.controller");
const mTypeService = require("../../../../services/monitoringType");

describe("GET BY ID Monitoring type Controller ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(mTypeService, "getMonitoringTypeById");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("Expect to send Type by that ID", async () => {
    stubGetById.returns({
      data: fixture.typeDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.typeDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mTypeController.getMonitoringTypeById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.typeDataTest,
    });
  });
  it("Expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "type not found" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: { id: 123 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mTypeController.getMonitoringTypeById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "type not found",
    });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubGetById.returns({
      err: { message: "invalidStatus" },
      status: "invalidStatus",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: { id: 123 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mTypeController.getMonitoringTypeById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
  });
});
