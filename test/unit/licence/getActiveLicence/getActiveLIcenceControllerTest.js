const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const licenceController = require("../../../../controllers/licence.controller");
const licenceService = require("../../../../services/licence");

describe("GET BY Customer Active licence Controller ", () => {
  let stubGetByCustomer;
  beforeEach(() => {
    stubGetByCustomer = sinon.stub(
      licenceService,
      "latestCustomerLicence"
    );
  });
  afterEach(() => {
    stubGetByCustomer.restore();
  });
  it("Expect to send Active Licence For That Customer", async () => {
    stubGetByCustomer.returns({
      data: fixture.arrayofActiveLicences,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.licenceDataTest.customerId },
      
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.getLatesLicenceByCustomerId(req, res);
    expect(stubGetByCustomer).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofActiveLicences,
    });
  });


  it("Expect to send Active Licence For That Customer route+post+ip", async () => {
    stubGetByCustomer.returns({
      data: fixture.arrayofActiveLicences,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.licenceDataTest.customerId },
      route: "/testing", method: 'post', ip: '1234'
      
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.getLatesLicenceByCustomerId(req, res);
    expect(stubGetByCustomer).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofActiveLicences,
    });
  });


  it("Expect to return An Error: Missing Customer ID route+post+ip", async () => {
    stubGetByCustomer.returns({
        err: { message: "Missing Customer ID" },
        status: "error",
        statusCode: 400,
    });
    let req = {
      body: {},
      params: {},
      route: "/testing", method: 'post', ip: '1234'
      
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.getLatesLicenceByCustomerId(req, res);
    expect(stubGetByCustomer).to.be.calledWith();
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
        message: "Missing Customer ID",
    });
  });


  it("Expect to return An Error: Missing Customer ID", async () => {
    stubGetByCustomer.returns({
        err: { message: "Missing Customer ID" },
        status: "error",
        statusCode: 400,
    });
    let req = {
      body: {},
      params: {},
      
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await licenceController.getLatesLicenceByCustomerId(req, res);
    expect(stubGetByCustomer).to.be.calledWith();
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
        message: "Missing Customer ID",
    });
  });

  it("Expect to return an error - ID Does not exist", async () => {
    stubGetByCustomer.returns({
      err: { message: "licence not found" },
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
    await licenceController.getLatesLicenceByCustomerId(req, res);
    expect(stubGetByCustomer).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "licence not found",
    });
  });


  it("Expect to return an error - ID Does not exist route+post+ip", async () => {
    stubGetByCustomer.returns({
      err: { message: "licence not found" },
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
    await licenceController.getLatesLicenceByCustomerId(req, res);
    expect(stubGetByCustomer).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "licence not found",
    });
  });


});
