const sinon = require("sinon");
const expect = require("chai").expect;
var sinonChai = require("sinon-chai");
var chai = require("chai");
chai.use(sinonChai);

const fixture = require("../fixture.json");
const mapController = require("../../../../controllers/map.controller");
const mapService = require("../../../../services/map");
describe("controller DELETE MAP test ", () => {
  let stubDelete;
  beforeEach(() => {
    stubDelete = sinon.stub(mapService, "deleteMAP");
  });
  afterEach(() => {
    stubDelete.restore();
  });
  it("expect to send MAP by that ID", async () => {
    stubDelete.returns({
      data: fixture.MapDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.MapDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.deleteMap(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.MapDataTest,
    });
  });
  it("expect to return an error - Wrong Id", async () => {
    stubDelete.returns({
      err: { message: "MAP not found" },
      status: "error",
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.deleteMap(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "MAP not found",
    });
  });

  it("expect to return an error Invalid Status", async () => {
    stubDelete.returns({
      data: fixture.MapDataTest,
      status: "Invalid Status",
    });
    let req = {
      body: {},
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.deleteMap(req, res);
    expect(stubDelete).to.be.calledOnce;
  });

  it("expect to return an error - Missing ID", async () => {
    stubDelete.returns({
      err: { message: "missing ID" },
      status: "error",
    });
    let req = {
      body: {},
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.deleteMap(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing ID",
    });
  });
  it("expect to return an error - Missing ID + statusCode", async () => {
    stubDelete.returns({
      err: { message: "missing ID" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.deleteMap(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing ID",
    });
  });

  it("expect to return an error - Missing ID + route + method + ip", async () => {
    stubDelete.returns({
      err: { message: "missing ID" },
      status: "error",
    });
    let req = {
      body: {},
      params: {},
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.deleteMap(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing ID",
    });
  });

});
