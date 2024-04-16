const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const roleController = require("../../../../controllers/role.controller");
const roleService = require("../../../../services/role");

describe("controller DELETE Role test ", () => {
  let stubDelete;
  beforeEach(() => {
    stubDelete = sinon.stub(roleService, "deleteRoleService");
  });
  afterEach(() => {
    stubDelete.restore();
  });
  it("expect to return new role ", async () => {
    stubDelete.returns({
      data: fixture.roleDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.roleDataTest },
      params: { id: fixture.roleDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleController.deleteRole(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.roleDataTest,
    });
  });

  it("expect to send role by that ID   + route + method + ip", async () => {
    stubDelete.returns({
      data: fixture.roleDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.roleDataTest._id },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleController.deleteRole(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.roleDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubDelete.returns({
      err: { message: "role not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.roleDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleController.deleteRole(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "role not found",
    });
  });
  it("expect to return an error - Wrong Id + route + method + ip", async () => {
    stubDelete.returns({
      err: { message: "role not found" },
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
    await roleController.deleteRole(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "role not found",
    });
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
    await roleController.deleteRole(req, res);
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
    await roleController.deleteRole(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing ID",
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
    await roleController.deleteRole(req, res);
    expect(stubDelete).to.be.calledOnce;
  });
});
