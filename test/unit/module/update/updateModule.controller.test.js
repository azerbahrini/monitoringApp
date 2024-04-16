const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const moduleController = require("../../../../controllers/module.controller");
const moduleService = require("../../../../services/module");

describe("controller UPDATE Module test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(moduleService, "updateModuleService");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new module ", async () => {
    stubUpdate.returns({
      data: fixture.ModuleDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.ModuleDataTest },
      params: { id: fixture.ModuleDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.updateModule(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.ModuleDataTest,
    });
  });

  it("expect to return new module   + route + method + ip", async () => {
    stubUpdate.returns({
      data: fixture.ModuleDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.ModuleDataTest },
      params: { id: fixture.ModuleDataTest._id },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.updateModule(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.ModuleDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "module not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.ModuleDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.updateModule(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "module not found",
    });
  });

  it("expect to return an error - sending without statusCode", async () => {
    stubUpdate.returns({
      err: { message: "module not found" },
      status: "error",
      // statusCode: 404, sending without statusCode
    });
    let req = {
      body: { ...fixture.ModuleDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.updateModule(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "module not found",
    });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubUpdate.returns({
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
    await moduleController.updateModule(req, res);
    expect(stubUpdate).to.be.calledOnce;
  });

  it("expect to return an error - ID Does not exist    + route + method + ip", async () => {
    stubUpdate.returns({
      err: { message: "module not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.ModuleDataTest },
      params: { id: fixture.wrongID },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.updateModule(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "module not found",
    });
  });
});
