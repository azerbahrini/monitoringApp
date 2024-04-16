const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const fixture = require("../fixture.json");
const mapController = require("../../../../controllers/map.controller");
const mapService = require("../../../../services/map");
describe("controller get system by id test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(mapService, "addMAP");
  });
  afterEach(() => {
    stubAdd.restore();
  });

  it("send a correct system class object ", async () => {
    stubAdd.returns({
      data: fixture.MapDataTest,
      status: "success",
    });
    let req = {
      body: fixture.MapDataTestWithoutID,
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.addMap(req, res);
    expect(stubAdd).to.be.calledWith(fixture.ReturnedMapDataTestWithoutID);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.MapDataTest,
    });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubAdd.returns({
      err: { message: "invalidStatus" },
      status: "invalidStatus",
    });
    let req = {
      body: fixture.MapDataTestWithoutID,
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.addMap(req, res);
    expect(stubAdd).to.be.calledOnce;
  });

  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: fixture.MapDataTestWithoutID,
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.addMap(req, res);
    expect(stubAdd).to.be.calledWith(fixture.ReturnedMapDataTestWithoutID);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
