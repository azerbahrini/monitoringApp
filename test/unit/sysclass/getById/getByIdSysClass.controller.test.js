const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const sysclassController = require("../../../../controllers/sysclass.controller");
const sysclassService = require("../../../../services/sysclass");

describe("controller get system by id test ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(sysclassService, "getSysClassByIdService");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("expect to send system class by that ID", async () => {
    stubGetById.returns({
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
    await sysclassController.getClassById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.SysClassDataTest,
    });
  });
  it("expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "system class not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.getClassById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "system class not found",
    });
  });

  it("expect to return error INVALID STATUS", async () => {
    stubGetById.returns({
      err: { message: "INVALID STATUS" },
      status: "wrong_status",
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.getClassById(req, res);
    expect(stubGetById).to.be.calledWith("60ee0042d9b53b3e084209f6");
  });

  it("expect to return error - sending without a STATUS", async () => {
    stubGetById.returns({
      err: { message: "INVALID STATUS" }
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.getClassById(req, res);
    expect(stubGetById).to.be.calledWith("60ee0042d9b53b3e084209f6");
  });

  it("expect to return error , without a statusCode", async () => {
    stubGetById.returns({
      err: { message: "400 error" },
      status: "error",
      // statusCode: 400  without a statusCode
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.getClassById(req, res);
  });

});
