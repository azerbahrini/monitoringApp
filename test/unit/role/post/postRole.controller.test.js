const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const roleController = require("../../../../controllers/role.controller");
const roleService = require("../../../../services/role");
describe("controller POST Role test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(roleService, "addRoleService");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct role object ", async () => {
    stubAdd.returns({
      data: fixture.roleDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.roleDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleController.addRole(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.roleDataTest,
    });
  });
  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { isActive: fixture.roleDataTest.isActive },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleController.addRole(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
  it("send a correct role object  + route + method + ip", async () => {
    stubAdd.returns({
      data: fixture.roleDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.roleDataTestWithoutID },
      params: {},
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleController.addRole(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.roleDataTest,
    });
  });
  it("send a wrong role data form - Missing Property  + route + method + ip", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { title: fixture.roleDataTest.title },
      params: {},
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleController.addRole(req, res);
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
      body: { title: fixture.roleDataTest.title },
      params: {},
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleController.addRole(req, res);
    expect(stubAdd).to.be.calledOnce;
  });
});
