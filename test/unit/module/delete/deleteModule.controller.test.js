const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const moduleController = require("../../../../controllers/module.controller");
const moduleService = require("../../../../services/module");
describe("controller DELETE module test ", () => {
  let stubDelete;
  beforeEach(() => {
    stubDelete = sinon.stub(moduleService, "deleteModuleService");
  });
  afterEach(() => {
    stubDelete.restore();
  });

  it("expect to send module by that ID", async () => {
    stubDelete.returns({
      data: fixture.ModuleDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.ModuleDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.deleteModule(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.ModuleDataTest,
    });
  });

  it("expect to send module by that ID   + route + method + ip", async () => {
    stubDelete.returns({
      data: fixture.ModuleDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.ModuleDataTest._id },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.deleteModule(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.ModuleDataTest,
    });
  });

  it("expect to return an error - Wrong Id", async () => {
    stubDelete.returns({
      err: { message: "module not found" },
      status: "error",
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.deleteModule(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "module not found",
    });
  });

  it("expect to return an error - Wrong Id + route + method + ip", async () => {
    stubDelete.returns({
      err: { message: "module not found" },
      status: "error",
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.deleteModule(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "module not found",
    });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubDelete.returns({
      err: { message: "invalidStatus" },
      status: "invalidStatus",
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.deleteModule(req, res);
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
    await moduleController.deleteModule(req, res);
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
    await moduleController.deleteModule(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing ID",
    });
  });
});
