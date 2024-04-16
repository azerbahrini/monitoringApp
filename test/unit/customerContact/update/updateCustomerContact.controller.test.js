const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const customerContactController = require("../../../../controllers/customerContact.controller");
const customerContactService = require("../../../../services/customerContact");

describe("controller UPDATE Customer Contact test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(customerContactService, "updateCustomerContact");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new type ", async () => {
    stubUpdate.returns({
      data: fixture.customerContactDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.customerContactDataTestWithoutID },
      params: { id: fixture.customerContactDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.updateCustomerContact(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.customerContactDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "Customer Contact not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.customerContactDataTest },
      params: { id: fixture.WrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.updateCustomerContact(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "Customer Contact not found",
    });
  });
});
