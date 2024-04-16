const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const sysclassController = require("../../../../controllers/sysclass.controller");
const sysclassService = require("../../../../services/sysclass");

describe("controller UPDATE system class test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(sysclassService, "updateSysClassService");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new  system class ", async () => {
    stubUpdate.returns({
      data: fixture.SysClassDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.SysClassDataTestWithoutID },
      params: { id: fixture.SysClassDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.updateSystemClass(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.SysClassDataTest,
    });
  });

  it("expect to return an error - INVALID STATUS", async () => {
    stubUpdate.returns({
      err: { message: "Invalid status message" },
      status: "INVALID STATUS",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.SysClassDataTestWithoutID },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.updateSystemClass(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
  });

  it("expect to return an error -  without statusCode", async () => {
    stubUpdate.returns({
      err: { message: "Invalid status message" },
      status: "error",
      // statusCode: 404,   without statusCode
    });
    let req = {
      body: { ...fixture.SysClassDataTestWithoutID },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.updateSystemClass(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Invalid status message",
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "system class not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.SysClassDataTestWithoutID },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.updateSystemClass(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "system class not found",
    });
  });
});
