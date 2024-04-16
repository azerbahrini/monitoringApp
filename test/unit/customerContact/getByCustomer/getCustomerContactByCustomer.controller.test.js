const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const customerContactController = require("../../../../controllers/customerContact.controller");
const customerContactService = require("../../../../services/customerContact");

describe("controller GET ALL Customer Contact By Customer test ", () => {
  let stubGetByCustomer;
  beforeEach(() => {
    stubGetByCustomer = sinon.stub(
      customerContactService,
      "getCustomerContactByCustomer"
    );
  });
  afterEach(() => {
    stubGetByCustomer.restore();
  });
  it("expect to send all Customer Contact ", async () => {
    stubGetByCustomer.returns({
      data: fixture.arrayOfCustomerContact,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.customerContactDataTest._id },
      query: { page: 0, size: 10 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.getContactByCustomer(req, res);
    expect(stubGetByCustomer).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayOfCustomerContact,
    });
  });
  it("Expect to send Customer Contact by Customer id", async () => {
    stubGetByCustomer.returns({
      err: { message: "Something Wrong" },
      status: "error",
    });
    let req = {
      body: {},
      params: { id: fixture.customerContactDataTest._id },
      query: { page: 0, size: 10 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.getContactByCustomer(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Something Wrong",
    });
  });
});
