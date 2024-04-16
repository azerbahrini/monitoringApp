const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const slaController = require("../../../../controllers/sla.controller");
const slaService = require("../../../../services/sla");
describe("controller POST Sla test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(slaService, "addSlaService");
  });
  afterEach(() => {
    stubAdd.restore();
  });

  it("send a correct sla object ", async () => {
    stubAdd.returns({
      data: fixture.slaDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.slaDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.addSla(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.slaDataTest,
    });
  });

  it("send a correct sla object  + route + method + ip", async () => {
    stubAdd.returns({
      data: fixture.slaDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.slaDataTestWithoutID },
      params: {},
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.addSla(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.slaDataTest,
    });
  });

  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { startDate: fixture.slaDataTest.startDate },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.addSla(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });

  it("Expect to return an error - invalid Status", async () => {
    stubAdd.returns({
      err: { message: "invalid Status message" },
      status: "invalid Status",
      statusCode: 400,
    });
    let req = {
      body: { startDate: fixture.slaDataTest.startDate },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.addSla(req, res);
    expect(stubAdd).to.be.calledOnce;
  });

  it("send a wrong data form - Missing Property + route + method + ip", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { startDate: fixture.slaDataTest.startDate },
      params: {},
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.addSla(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
