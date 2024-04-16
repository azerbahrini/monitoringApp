const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const roleHistoryController = require("../../../../controllers/roleHistory.controller");
const roleHistoryService = require("../../../../services/roleHistory");
describe("controller add a role History ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(roleHistoryService,"addRoleHistoryService");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct role History class object ", async () => {
    stubAdd.returns({
      data: fixture.roleHistory,
      status: "success",
    });
    let req = {
      body: { ...fixture.roleHistoryDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.addRoleHistoryController(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data:fixture.roleHistory,
    });
  });


  it("send a correct role History class object route+post+ip", async () => {
    stubAdd.returns({
      data: fixture.roleHistory,
      status: "success",
    });
    let req = {
      body: { ...fixture.roleHistoryDataTestWithoutID },
      params: {},
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.addRoleHistoryController(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data:fixture.roleHistory,
    });
  });


  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { active: fixture.roleHistory.Role},
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.addRoleHistoryController(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });


  it("send a wrong data form - Missing Property route+post+ip", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { active: fixture.roleHistory.Role},
      params: {},
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.addRoleHistoryController(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubAdd.returns({
      err: { message: "invalidStatus" },
      status: "invalidStatus",
    });
    let req = {
      body: { active: fixture.roleHistory.Role},
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.addRoleHistoryController(req, res);
    expect(stubAdd).to.be.calledOnce;
  });
});
