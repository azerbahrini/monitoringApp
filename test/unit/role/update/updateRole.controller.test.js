const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const roleController = require("../../../../controllers/role.controller");
const roleService = require("../../../../services/role");

describe("controller UPDATE Role test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(roleService, "updateRoleService");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new role ", async () => {
    stubUpdate.returns({
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
    await roleController.updateRole(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.roleDataTest,
    });
  });

  it("expect to return new role   + route + method + ip", async () => {
    stubUpdate.returns({
      data: fixture.roleDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.roleDataTest },
      params: { id: fixture.roleDataTest._id },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleController.updateRole(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.roleDataTest,
    });
  });
  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
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
    await roleController.updateRole(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "role not found",
    });
  });
  it("expect to return an error - sending without statusCode", async () => {
    stubUpdate.returns({
      err: { message: "role not found" },
      status: "error",
      
    });
    let req = {
      body: { ...fixture.roleDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleController.updateRole(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "role not found",
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
    await roleController.updateRole(req, res);
    expect(stubUpdate).to.be.calledOnce;
  });

  it("expect to return an error - ID Does not exist    + route + method + ip", async () => {
    stubUpdate.returns({
      err: { message: "role not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.roleDataTest },
      params: { id: fixture.wrongID },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleController.updateRole(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "role not found",
    });
  });
});
