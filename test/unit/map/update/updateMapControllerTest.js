const sinon = require("sinon");
const expect = require("chai").expect;
var sinonChai = require("sinon-chai");
var chai = require("chai");
const fixture = require("../fixture.json");
const mapController = require("../../../../controllers/map.controller");
const mapService = require("../../../../services/map");

chai.use(sinonChai);
describe("controller UPDATE Map test ", () => {
  let stubDelete, stubAdd;
  beforeEach(() => {
    stubDelete = sinon.stub(mapService, "deleteMAP");
    stubAdd = sinon.stub(mapService, "addMAP");
  });
  afterEach(() => {
    stubDelete.restore();
    stubAdd.restore();
  });

  it("expect to return success", async () => {
    stubAdd.returns({
      data: fixture.MapDataTest,
      status: "success",
    });
    stubDelete.returns({
      status: "success",
      statusCode: 201,
    });
    let req = {
      body: { ...fixture.MapDataTestWithoutID },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.updateMap(req, res);
    expect(stubAdd).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.MapDataTest,
    });
  });

  it("expect to return an error (create but fail to delete)", async () => {
    stubAdd.returns({
      data: fixture.MapDataTest,
      status: "success",
    });
    stubDelete.returns({
      status: "error",
      err: { message: "Failed to delete the map" },
      statusCode: 400,
    });
    let req = {
      body: { ...fixture.MapDataTestWithoutID },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.updateMap(req, res);
    expect(stubAdd).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: "Failed to delete the map" });
  });

  it("expect to return an error Without Status Code", async () => {
    stubAdd.returns({
      data: fixture.MapDataTest,
      status: "success",
    });
    stubDelete.returns({
      status: "error",
      err: { message: "Failed to delete the map" },
      // statusCode: 400, without status code
    });
    let req = {
      body: { ...fixture.MapDataTestWithoutID },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.updateMap(req, res);
    expect(stubAdd).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: "Failed to delete the map" });
  });

  it("expect to return an error Invalid Status", async () => {
    stubAdd.returns({
      data: fixture.MapDataTest,
      status: "success",
    });
    stubDelete.returns({
      status: "Invalid Status",
      err: { message: "Invalid Status Message" },
      statusCode: 400,
    });
    let req = {
      body: { ...fixture.MapDataTestWithoutID },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.updateMap(req, res);
    expect(stubAdd).to.be.calledOnce;
    expect(stubDelete).to.be.calledOnce;
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubDelete.returns({
      err: { message: "Map not found" },
      status: "error",
      statusCode: 404,
    });
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: { ...fixture.MapDataTestWithoutID },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.updateMap(req, res);
    expect(stubAdd).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
