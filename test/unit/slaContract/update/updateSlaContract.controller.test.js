const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const slaContractController = require("../../../../controllers/slaContract.controller");
const slaContractService = require("../../../../services/slaContract");

describe("controller UPDATE SlaContract test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(slaContractService, "updateSlaContractService");
  });
  afterEach(() => {
    stubUpdate.restore();
  });


  it("expect to return new slaContract ", async () => {
    stubUpdate.returns({
      data: fixture.slaContractDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.slaContractDataTest },
      params: { id: fixture.slaContractDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.updateSlaContract(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.slaContractDataTest,
    });
  });



  it("expect to return new slaContract route+post+ip", async () => {
    stubUpdate.returns({
      data: fixture.slaContractDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.slaContractDataTest },
      params: { id: fixture.slaContractDataTest._id },
      route: "/testing", method: 'post', ip: '1234'

    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.updateSlaContract(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.slaContractDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "slaContract not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.slaContractDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.updateSlaContract(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "slaContract not found",
    });
  });



  it("expect to return an error - ID Does not exist route+post+ip", async () => {
    stubUpdate.returns({
      err: { message: "slaContract not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.slaContractDataTest },
      params: { id: fixture.wrongID },
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.updateSlaContract(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "slaContract not found",
    });
  });
});
