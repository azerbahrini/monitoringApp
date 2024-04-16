const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const moduleController = require("../../../../controllers/module.controller");
const moduleService = require("../../../../services/module");

describe("controller GET ALL Basic test ", () => {
  let stubGetAll;
  beforeEach(() => {
    stubGetAll = sinon.stub(moduleService, "getAllModuleService");
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it("expect to send all Basic Modules", async () => {
    stubGetAll.returns({
      data: fixture.arrayofModules,
      status: "success",
    });

    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.getAllBasicModule(req, res);
    expect(stubGetAll).to.be.calledOnce;

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofModules,
    });
  });

  it("expect to send all Basic Modules + route + method + ip", async () => {
    stubGetAll.returns({
      data: fixture.arrayofModules,
      status: "success",
    });

    let req = {
      body: {},
      params: {},
      query: { page: 2, size: 2 },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.getAllBasicModule(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofModules,
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
    await moduleController.getAllBasicModule(req, res);
  });

  it("expect to return an error", async () => {
    stubGetAll.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.getAllBasicModule(req, res);
    expect(stubGetAll).to.be.calledOnce;

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });

  it("expect to return an error + route + method + ip", async () => {
    stubGetAll.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: {},
      params: {},
      query: { page: 2, size: 2 },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.getAllBasicModule(req, res);
    expect(stubGetAll).to.be.calledOnce;

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
