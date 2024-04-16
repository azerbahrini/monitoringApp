const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const fixture = require("../fixture.json");
const roleHistoryController = require("../../../../controllers/roleHistory.controller");
const roleHistoryService = require("../../../../services/roleHistory");

describe("controller UPDATE Role History test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(roleHistoryService,"updateRoleHistoryService");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new role History ", async () => {
    stubUpdate.returns({
      data: fixture.roleHistory,
      status: "success",
    });
    let req = {
      body: { ...fixture.roleHistoryDataTestWithoutID ,startDate: '2021-12-03'},
      params: { id: fixture.roleHistory._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.updateRoleHistoryController(req, res);
    expect(stubUpdate).to.be.calledWith(req.body,req.params.id);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.roleHistory,
    });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubUpdate.returns({
      err: { message: "invalidStatus" },
      status: "invalidStatus",
    });
    let req = {
      body: { ...fixture.roleHistoryDataTestWithoutID },
      params: {id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.updateRoleHistoryController(req, res);
    expect(stubUpdate).to.be.calledOnce;
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "RoleHistory not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.roleHistoryDataTestWithoutID },
      params: {id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.updateRoleHistoryController(req, res);
    expect(stubUpdate).to.be.calledWith(req.body,req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "RoleHistory not found",
    });
  });

  it("expect to return an error - Without status code", async () => {
    stubUpdate.returns({
      err: { message: "RoleHistory not found" },
      status: "error",
      // statusCode: 404, Without status code
    });
    let req = {
      body: { ...fixture.roleHistoryDataTestWithoutID },
      params: {id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.updateRoleHistoryController(req, res);
    expect(stubUpdate).to.be.calledWith(req.body,req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "RoleHistory not found",
    });
  });

});
