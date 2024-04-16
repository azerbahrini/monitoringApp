const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const roleController = require("../../../../controllers/role.controller");
const roleService = require("../../../../services/role");

describe("GET BY ID role Controller ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(roleService, "getRoleByIdService");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("Expect to send Role by that ID", async () => {
    stubGetById.returns({
      data: fixture.roleDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.roleDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleController.getRoleById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.roleDataTest,
    });
  });
  it("Expect to send Role by that ID  + route + method + ip", async () => {
    stubGetById.returns({
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
    await roleController.getRoleById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.roleDataTest,
    });
  });

  it("Expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "role not found" },
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
    await roleController.getRoleById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "role not found",
    });
  });
  it("Expect to return an error - without StatusCode", async () => {
    stubGetById.returns({
      err: { message: "role not found" },
      status: "error",
      
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleController.getRoleById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "role not found",
    });
  });
  it("expect to return an error - Invalid Status", async () => {
    stubGetById.returns({
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
    await roleController.getRoleById(req, res);
    expect(stubGetById).to.be.calledOnce;
  });
  it("Expect to return an error - ID Does not exist  + route + method + ip", async () => {
    stubGetById.returns({
      err: { message: "role not found" },
      status: "error",
      statusCode: 404,
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
    await roleController.getRoleById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "role not found",
    });
  });

});
