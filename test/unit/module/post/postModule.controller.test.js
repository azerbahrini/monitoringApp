const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const moduleController = require("../../../../controllers/module.controller");
const moduleService = require("../../../../services/module");
describe("controller POST Module test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(moduleService, "addModuleService");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct module object ", async () => {
    stubAdd.returns({
      data: fixture.ModuleDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.ModuleDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.addModule(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.ModuleDataTest,
    });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubAdd.returns({
      err: { message: "invalidStatus" },
      status: "invalidStatus",
    });
    let req = {
      body: { ...fixture.ModuleDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.addModule(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
  });

  it("send a correct module object  + route + method + ip", async () => {
    stubAdd.returns({
      data: fixture.ModuleDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.ModuleDataTestWithoutID },
      params: {},
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.addModule(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.ModuleDataTest,
    });
  });

  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { title: fixture.ModuleDataTest.title },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.addModule(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });

  it("send a wrong data form - Missing Property  + route + method + ip", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { title: fixture.ModuleDataTest.title },
      params: {},
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await moduleController.addModule(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
