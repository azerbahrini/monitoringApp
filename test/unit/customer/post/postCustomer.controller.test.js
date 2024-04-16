const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const customerController = require("../../../../controllers/customer.controller");
const customerService = require("../../../../services/customer");

describe("controller POST Customer test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(customerService, "addCustomerService");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct customer object ", async () => {
    stubAdd.returns({
      data: fixture.customerDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.customerDataTestWithoutID },
      params: {},
      query: {timeZone: fixture.customerDataTestWithoutID.timeZone}
    };
    let res = {};
    let body = {
        isActive: req.body.isActive,
        label: req.body.label,
        address: req.body.address,
        firstReport: req.body.firstReport,
        logo: "defaultCustomerLogo.png",
        timeZone: req.body.timeZone.split(","),
        listMonitoringType: req.body.listMonitoringType.split(","),
        startDate: "2021-12-02",
        endDate: "2023-12-02"
      };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerController.addCustomer(req, res);
    expect(stubAdd).to.be.calledWith(body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.customerDataTest,
    });
  });








  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { label: fixture.customerDataTest.label },
      params: {},
      query: {timeZone: null}

    };
    let res = {};
    let body = {
        isActive:null,
        label: req.body.label,
        address: null,
        firstReport: null,
        logo: "defaultCustomerLogo.png",
        timeZone: null,
        listMonitoringType: null,
        startDate: null,
        endDate: null
      };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerController.addCustomer(req, res);
    expect(stubAdd).to.be.calledWith(body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
