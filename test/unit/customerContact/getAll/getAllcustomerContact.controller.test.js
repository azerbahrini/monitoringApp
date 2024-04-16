const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const customerContactController = require("../../../../controllers/customerContact.controller");
const customerContactService = require("../../../../services/customerContact");

describe("controller GET ALL Customer Contact test ", () => {
  let stubGetAll;
  beforeEach(() => {
    stubGetAll = sinon.stub(customerContactService, "getAllCustomerContact");
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it("expect to send all Customer Contact ", async () => {
    stubGetAll.returns({
      data: fixture.getAllMongoosePaginationArray,
      status: "success",
    });
    let req = { body: {}, params: {}, query: { page: 0, size: 1 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.getAllCustomerContact(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.getAllMongoosePaginationArray,
    });
  });
  it("Throw An Internal Error ", async () => {
    stubGetAll.returns({
      err: { message: "Something Wrong" },
      status: "error",
    });
    let req = { body: {}, params: {}, query: { page: 0, size: 1 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.getAllCustomerContact(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Something Wrong",
    });
  });
});
