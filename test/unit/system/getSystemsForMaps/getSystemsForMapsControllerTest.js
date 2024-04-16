const sinon = require("sinon");
const expect = require("chai").expect;
const fixture = require("./fixture.json");
const systemController = require("../../../../controllers/system.controller");
const systemService = require("../../../../services/system");
const chai = require('chai');
chai.use(require('sinon-chai'));

describe("GET BY ID system Controller ", () => {
  let stubGetSystemsForMapsService;
  beforeEach(() => {
    stubGetSystemsForMapsService = sinon.stub(
      systemService,
      "getSystemsForMapsService"
    );
  });
  afterEach(() => {
    stubGetSystemsForMapsService.restore();
  });
  it("Expect to send list of systems for maps", async () => {
    stubGetSystemsForMapsService.returns({
      data: fixture.arrayOfSystemNames,
      status: "success"
    });
    let req = {
      body: {},
      query: {
        customerId: fixture.SystemDataTest.customer,
        typeId: fixture.SystemDataTest.type,
        categoryId: fixture.SystemDataTest.category,
        systemId: fixture.SystemDataTest._id
      }
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getSystemsForMaps(req, res);
    expect(stubGetSystemsForMapsService).to.be.calledWith(req.query.customerId,
      req.query.typeId, req.query.categoryId, req.query.systemId);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayOfSystemNames
    });
  });
  it("expect not to send systems for maps", async () => {
    stubGetSystemsForMapsService.returns({
      err: { message: "error" },
      status: "error",
    });
    let req = {
      body: {},
      query: {
        customerId: fixture.SystemDataTest.customer,
        typeId: fixture.SystemDataTest.type,
        categoryId: fixture.SystemDataTest.category,
        systemId: fixture.SystemDataTest._id
      }
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await systemController.getSystemsForMaps(req, res);
    expect(stubGetSystemsForMapsService).to.be.calledOnce;
    expect(res.status).to.be.calledWith(400);
    expect(res.json).be.calledWith({
      message: "error"
    });
  });
});
