const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const slaController = require("../../../../controllers/sla.controller");
const slaService = require("../../../../services/sla");

describe("controller UPDATE Sla test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(slaService, "updateSlaService");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new sla ", async () => {
    stubUpdate.returns({
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
    await slaController.updateSla(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.slaDataTest,
    });
  });

  it("expect to return new sla  + route + method + ip", async () => {
    stubUpdate.returns({
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
    await slaController.updateSla(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.slaDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
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
    await slaController.updateSla(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "sla not found",
    });
  });

  it("expect to return an error - without statusCode", async () => {
    stubUpdate.returns({
      err: { message: "sla not found" },
      status: "error",
      // statusCode: 404, - without statusCode
    });
    let req = {
      body: { ...fixture.slaDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.updateSla(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "sla not found",
    });
  });

  it("expect to return an error - ID Does not exist + route + method + ip", async () => {
    stubUpdate.returns({
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
    await slaController.updateSla(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "sla not found",
    });
  });

  it("Expect to return 400 error message - Invalid Status", async () => {
    stubUpdate.returns({
      err: { message: "400 error message" },
      status: "invalidStatus",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: { id: fixture.slaDataTest.slaContract },
      query: { page: 0, size: 2 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.updateSla(req, res);
    expect(stubUpdate).to.be.calledOnce;
    expect(stubUpdate).to.be.calledWith("608bde23c5a2a0a1607294a5");
  });
});
