const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const slaController = require("../../../../controllers/sla.controller");
const slaService = require("../../../../services/sla");

describe("GET BY slaContract sla Controller ", () => {
  let stubGetByslaContract;
  beforeEach(() => {
    stubGetByslaContract = sinon.stub(
      slaService,
      "getSlaBySlaContractIdService"
    );
  });
  afterEach(() => {
    stubGetByslaContract.restore();
  });
  it("Expect to send sla by that slaContract", async () => {
    stubGetByslaContract.returns({
      data: fixture.arrayofActiveslas,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.slaDataTest.slaContract },
      query: { page: 0, size: 2 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.getSlaBySlaContract(req, res);
    expect(stubGetByslaContract).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofActiveslas,
    });
  });


  it("Expect to return 400 error message - sending status code", async () => {
    stubGetByslaContract.returns({
      status: "error",
      err: { message: "400 error message" },
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
    await slaController.getSlaBySlaContract(req, res);
    expect(stubGetByslaContract).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "400 error message",
    });
  });
  it("Expect to return 400 error message + not sending Status code", async () => {
    stubGetByslaContract.returns({
      status: "error",
      err: { message: "400 error message" },
      // statusCode: 400,  not sending Status code
    });
    let req = {
      body: {},
      params: { id: fixture.slaDataTest.slaContract },
      query: { page: 0, size: 2 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.getSlaBySlaContract(req, res);
    expect(stubGetByslaContract).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "400 error message",
    });
  });  
  it("Expect to return 400 error message - Invalid Status", async () => {
    stubGetByslaContract.returns({
      err: { message: "400 error message" },
      status: "invalidStatus",
      // statusCode: 400,  not sending Status code
    });
    let req = {
      body: {},
      params: { id: fixture.slaDataTest.slaContract },
      query: { page: 0, size: 2 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await slaController.getSlaBySlaContract(req, res);
    expect(stubGetByslaContract).to.be.calledWith(req.params.id);
  });
});
