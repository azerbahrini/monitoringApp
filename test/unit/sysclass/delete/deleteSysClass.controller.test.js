const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const sysclassController = require("../../../../controllers/sysclass.controller");
const sysclassService = require("../../../../services/sysclass");
describe("controller DELETE system class test ", () => {
  let stubDelete;
  beforeEach(() => {
    stubDelete = sinon.stub(sysclassService, "deleteSysClassService");
  });
  afterEach(() => {
    stubDelete.restore();
  });
  it("expect to send system class by that ID", async () => {
    stubDelete.returns({
      data: fixture.SysClassDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.SysClassDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.deleteClass(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.SysClassDataTest,
    });
  });
  it("expect to return an error - Wrong Id", async () => {
    stubDelete.returns({
      err: { message: "system class not found" },
      status: "error",
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.deleteClass(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "system class not found",
    });
  });

  it("expect to return an error - Wrong STATUS", async () => {
    stubDelete.returns({
      err: { message: "WRONG STATUS" },
      status: "WRONG STATUS",
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.deleteClass(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
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
    await sysclassController.deleteClass(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing ID",
    });
  });
});
