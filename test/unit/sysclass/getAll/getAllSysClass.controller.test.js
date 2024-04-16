const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const sysclassController = require("../../../../controllers/sysclass.controller");
const sysClassService = require("../../../../services/sysclass");

describe("controller GET ALL test ", () => {
  let stubGetAll;
  beforeEach(() => {
    stubGetAll = sinon.stub(sysClassService, "getAllSysClassService");
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it("expect to send all system classes", async () => {
    stubGetAll.returns({
      data: fixture.arrayofSysClasses,
      status: "success",
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.getAllClass(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofSysClasses,
    });
  });

  it("expect to send all ACTIVE system classes", async () => {
    stubGetAll.returns({
      data: fixture.arrayofSysClasses,
      status: "success",
    });
    let req = {
      body: {},
      params: {},
      query: { page: 2, size: 2, isActive: true },
    };    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.getAllClass(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofSysClasses,
    });
  });
  it("expect NOT to send all system classes", async () => {
    stubGetAll.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.getAllClass(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });

  it("expect to return error INVALID STATUS", async () => {
    stubGetAll.returns({
      err: { message: "INVALID STATUS" },
      status: "wrong_status",
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.getAllClass(req, res);
  });

});
