const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const fixture = require("../fixture.json");
const mapController = require("../../../../controllers/map.controller");
const mapService = require("../../../../services/map");

describe("controller GET ALL test ", () => {
  let stubGetAll;
  beforeEach(() => {
    stubGetAll = sinon.stub(mapService, "getAllMAPsService");
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it("expect to send all Maps", async () => {
    stubGetAll.returns({
      data: fixture.arrayofMapes,
      status: "success",
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.getAllMaps(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofMapes,
    });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubGetAll.returns({
      err: { message: "invalidStatus" },
      status: "invalidStatus",
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.getAllMaps(req, res);
    expect(stubGetAll).to.be.calledOnce;
  });

  it("expect not to send all Maps 400 Error", async () => {
    stubGetAll.returns({
      status: "error",
      err: { message: "400 error" },
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.getAllMaps(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "400 error",
    });
    expect(res).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res).to.have.property("json");
  });
});
