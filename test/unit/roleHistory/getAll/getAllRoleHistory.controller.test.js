const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const roleHistoryController = require("../../../../controllers/roleHistory.controller");
const roleHistoryService = require("../../../../services/roleHistory");
const RoleHistory = require("../../../../models/RoleHistory");
describe("controller GET ALL test ", () => {
  let stubGetAll;
  let findStub;
  beforeEach(() => {
    stubGetAll = sinon.stub(roleHistoryService,"getAllRoleHistoryService");
    findStub = sinon.stub(RoleHistory,"find");
  });
  afterEach(() => {
    stubGetAll.restore();
    findStub.restore();
  });
  it("expect to send all role history", async () => {
    stubGetAll.returns({
      data: fixture.arrayofRoleHistory,
      status: "success",
    });
    let req = { body: {}, params: {} ,query:{page:1,size:5}};
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.getAllRoleHistoryController(req, res);
    expect(stubGetAll).to.be.calledOnce;

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofRoleHistory,
    });
  });

  it("expect to return an error", async () => {
    stubGetAll.returns({
      err: {message: "error"},
      status: "error",
    });
    let req = { body: {}, params: {}, query: { page: 1, size: 5 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.getAllRoleHistoryController(req, res);
    expect(stubGetAll).to.be.calledOnce;

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: "error" });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubGetAll.returns({
      err: { message: "invalidStatus" },
      status: "invalidStatus",
    });
    let req = { body: {}, params: {}, query: { page: 1, size: 5 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.getAllRoleHistoryController(req, res);
    expect(stubGetAll).to.be.calledOnce;
  });

});
