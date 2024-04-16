const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const customerContactController = require("../../../../controllers/customerContact.controller");
const customerContactService = require("../../../../services/customerContact");

describe("GET BY ID Customer Contact Controller ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(customerContactService, "getCustomerContactById");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("Expect to send Customer Contact by Customer id", async () => {
    stubGetById.returns({
      data: fixture.customerContactDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.customerContactDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.getCustomerContactById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.customerContactDataTest,
    });
  });
  it("Expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "customer contact not found" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: { id: 123 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.getCustomerContactById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "customer contact not found",
    });
  });
});
