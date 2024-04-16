const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const mapController = require("../../../../controllers/map.controller");
const mapService = require("../../../../services/map");

describe("controller get host by system test ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(mapService, "getBySystemId");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("expect to send host by that ID", async () => {
    stubGetById.returns({
      data: fixture.MapDataTest,
      status: "success",
    });
    let system = fixture.MapDataTest.system
    let req = {
      body: {},
      params: { sysId :system},
      query: { page: 0, size: 2 }
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.getAllMAPBySystem(req, res);
    expect(stubGetById).to.be.calledWith(req.params.sysId);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.MapDataTest,
    });
  });
  it("expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "Map not found" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: { sysId: 123 },
      query: { page: 0, size: 2 }
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.getAllMAPBySystem(req, res);
    expect(stubGetById).to.be.calledWith(req.params.sysId);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Map not found",
    });
  });

  it("expect to return an error - Missing System ID in Query", async () => {
    stubGetById.returns({
      err: { message: "Map not found" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: {},
      query: { page: 0, size: 2 }
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.getAllMAPBySystem(req, res);
    expect(stubGetById).to.be.calledWith(req.params.system);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Map not found",
    });
  });
  it("expect to return an error - Without Status code", async () => {
    stubGetById.returns({
      err: { message: "Map not found" },
      status: "error",
      // statusCode: 400, Without Status code
    });
    let req = {
      body: {},
      params: {},
      query: { page: 0, size: 2 }
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.getAllMAPBySystem(req, res);
    expect(stubGetById).to.be.calledWith(req.params.system);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Map not found",
    });
  });

});
