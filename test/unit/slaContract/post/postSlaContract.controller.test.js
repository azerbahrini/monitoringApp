const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
const fixture = require("../fixture.json");
const slaContractController = require("../../../../controllers/slaContract.controller");
const slaContractService = require("../../../../services/slaContract");
chai.use(sinonChai);
describe("controller POST SlaContract test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(slaContractService, "addSlaContractService");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct slaContract object ", async () => {
    stubAdd.returns({
      data: fixture.slaContractDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.slaContractDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.addSlaContract(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.slaContractDataTest,
    });
  });


  it("send a correct slaContract object route+post+ip", async () => {
    stubAdd.returns({
      data: fixture.slaContractDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.slaContractDataTestWithoutID },
      params: {},
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.addSlaContract(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.slaContractDataTest,
    });
  });


  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { startDate: fixture.slaContractDataTest.startDate },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.addSlaContract(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });




  it("send a wrong data form - Missing Property route+post+ip", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { startDate: fixture.slaContractDataTest.startDate },
      params: {},
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.addSlaContract(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
