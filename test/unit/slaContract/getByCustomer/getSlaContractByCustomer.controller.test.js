const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const slaContractController = require("../../../../controllers/slaContract.controller");
const customerService = require("../../../../services/customer");

describe("GET BY Customer slaContract Controller ", () => {
  let stubGetByCustomer;
  beforeEach(() => {
    stubGetByCustomer = sinon.stub(customerService, "getCustomerByIdService");
  });
  afterEach(() => {
    stubGetByCustomer.restore();
  });
  it("Expect to send SlaContract by that Customer", async () => {
    stubGetByCustomer.returns({
      data: { listSlaContract: fixture.arrayofActiveSlaContracts },
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.slaContractDataTest.customerId },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.getSlaContractByCustomer(req, res);
    expect(stubGetByCustomer).to.be.calledWith(req.params.id, [{ path: "listSlaContract", match: { isActive: true }, populate: { path: "class" } }]);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofActiveSlaContracts
    });
  });




  it("Expect to send SlaContract by that Customer route+post+ip", async () => {
    stubGetByCustomer.returns({
      data: { listSlaContract: fixture.arrayofActiveSlaContracts },
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.slaContractDataTest.customerId },
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaContractController.getSlaContractByCustomer(req, res);
    expect(stubGetByCustomer).to.be.calledWith(req.params.id, [{ path: "listSlaContract", match: { isActive: true }, populate: { path: "class" } }]);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofActiveSlaContracts
    });
  });
  it("Expect to return an error - Customer Does not exist", async () => {
    stubGetByCustomer.returns({
      err: { message: "customer not found" },
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
    await slaContractController.getSlaContractByCustomer(req, res);
    expect(stubGetByCustomer).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "customer not found",
    });
  });



  it("Expect to return an error - Customer Does not exist route+post+ip", async () => {
    stubGetByCustomer.returns({
      err: { message: "customer not found" },
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
    await slaContractController.getSlaContractByCustomer(req, res);
    expect(stubGetByCustomer).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "customer not found",
    });
  });
});
