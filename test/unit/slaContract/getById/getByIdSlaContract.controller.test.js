const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const slaContractController = require("../../../../controllers/slaContract.controller");
const slaContractService = require("../../../../services/slaContract");

describe("GET BY ID slaContract Controller ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(slaContractService, "getSlaContractByIdService");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("Expect to send SlaContract by that ID", async () => {
    stubGetById.returns({
      data: fixture.slaContractDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.slaContractDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.getSlaContractById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id, [
      { path: "class", select: "libelle" },
      { path: "customer", select: "label" },
    ]);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.slaContractDataTest,
    });
  });


  it("Expect to send SlaContract by that ID route+post+ip", async () => {
    stubGetById.returns({
      data: fixture.slaContractDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.slaContractDataTest._id },
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.getSlaContractById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id, [
      { path: "class", select: "libelle" },
      { path: "customer", select: "label" },
    ]);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.slaContractDataTest,
    });
  });



  it("Expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "slaContract not found" },
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
    await slaContractController.getSlaContractById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id, [
      { path: "class", select: "libelle" },
      { path: "customer", select: "label" },
    ]);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "slaContract not found",
    });
  });


  it("Expect to return an error - ID Does not exist route+post+ip", async () => {
    stubGetById.returns({
      err: { message: "slaContract not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.getSlaContractById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id, [
      { path: "class", select: "libelle" },
      { path: "customer", select: "label" },
    ]);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "slaContract not found",
    });
  });
});
