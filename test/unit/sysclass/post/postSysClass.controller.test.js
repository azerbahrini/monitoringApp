const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const sysclassController = require("../../../../controllers/sysclass.controller");
const sysclassService = require("../../../../services/sysclass");
describe("controller get system by id test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(sysclassService, "addSysClassService");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct system class object ", async () => {
    stubAdd.returns({
      data: fixture.SysClassDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.SysClassDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.addClass(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.SysClassDataTest,
    });
  });
  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { isActive: fixture.SysClassDataTest.active },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.addClass(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });

  it("expect to return error INVALID STATUS", async () => {
    stubAdd.returns({
      err: { message: "INVALID STATUS" },
      status: "wrong_status",
    });
    let req = {
      body: { isActive: fixture.SysClassDataTest.active },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await sysclassController.addClass(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
  });

});
