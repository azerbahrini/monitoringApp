const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const slaController = require("../../../../controllers/sla.controller");
const slaService = require("../../../../services/sla");

describe("controller DELETE Sla test ", () => {
  let stubDelete;
  beforeEach(() => {
    stubDelete = sinon.stub(slaService, "deleteSlaService");
  });
  afterEach(() => {
    stubDelete.restore();
  });
  it("expect to return new sla ", async () => {
    stubDelete.returns({
      data: fixture.slaDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.slaDataTest },
      params: { id: fixture.slaDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.deleteSla(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.slaDataTest,
    });
  });

  it("expect to return new sla + route + method + ip", async () => {
    stubDelete.returns({
      data: fixture.slaDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.slaDataTest },
      params: { id: fixture.slaDataTest._id },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.deleteSla(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.slaDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubDelete.returns({
      err: { message: "sla not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.slaDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.deleteSla(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "sla not found",
    });
  });

  it("expect to return an error - without statusCode", async () => {
    stubDelete.returns({
      err: { message: "sla not found" },
      status: "error",
      // statusCode: 404,     without statusCode
    });
    let req = {
      body: { ...fixture.slaDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.deleteSla(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "sla not found",
    });
  });

  it("Expect to return an error - invalid Status", async () => {
    stubDelete.returns({
      err: { message: "invalid Status message" },
      status: "invalid Status",
      statusCode: 400,
    });
    let req = {
      body: { ...fixture.slaDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.deleteSla(req, res);
    expect(stubDelete).to.be.calledOnce;
  });

  it("expect to return an error - ID Does not exist + route + method + ip", async () => {
    stubDelete.returns({
      err: { message: "sla not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.slaDataTest },
      params: { id: fixture.wrongID },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.deleteSla(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "sla not found",
    });
  });
});
