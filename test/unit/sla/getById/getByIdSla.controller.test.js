const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const slaController = require("../../../../controllers/sla.controller");
const slaService = require("../../../../services/sla");

describe("GET BY ID sla Controller ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(slaService, "getSlaByIdService");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("Expect to send Sla by that ID", async () => {
    stubGetById.returns({
      data: fixture.slaDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.slaDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.getSlaById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.slaDataTest,
    });
  });

  it("Expect to send Sla by that ID + route + method + ip", async () => {
    stubGetById.returns({
      data: fixture.slaDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.slaDataTest._id },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.getSlaById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.slaDataTest,
    });
  });

  it("Expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "sla not found" },
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
    await slaController.getSlaById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "sla not found",
    });
  });

  it("Expect to return an error - invalid Status", async () => {
    stubGetById.returns({
      err: { message: "invalid Status message" },
      status: "invalid Status",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.getSlaById(req, res);
    expect(stubGetById).to.be.calledOnce;
    expect(stubGetById).to.be.calledWith(req.params.id);
  });

  it("Expect to return an error - ID Does not exist + not sending the statusCode", async () => {
    stubGetById.returns({
      err: { message: "sla not found" },
      status: "error",
      // statusCode: 404, not sending the statusCode
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.getSlaById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "sla not found",
    });
  });

  it("Expect to return an error - ID Does not exist + route + method + ip", async () => {
    stubGetById.returns({
      err: { message: "sla not found" },
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
    await slaController.getSlaById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "sla not found",
    });
  });
});
