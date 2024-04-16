const sinon = require("sinon");
const expect = require("chai").expect;
var chai = require("chai");
chai.use(require("sinon-chai"));
const fixture = require("../fixture.json");
const monitoringTypeController = require("../../../../controllers/monitoringType.controller");
const monitoringTypeService = require("../../../../services/monitoringType");
describe("controller POST Monitoring Type test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(monitoringTypeService, "addMonitoringType");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct type object ", async () => {
    stubAdd.returns({
      data: fixture.typeDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.typeDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringTypeController.addMonitoringType(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.typeDataTest,
    });
  });

  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { active: fixture.typeDataTest.active },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringTypeController.addMonitoringType(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubAdd.returns({
      err: { message: "invalidStatus" },
      status: "invalidStatus",
    });
    let req = {
      body: { active: fixture.typeDataTest.active },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await monitoringTypeController.addMonitoringType(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
  });

});
