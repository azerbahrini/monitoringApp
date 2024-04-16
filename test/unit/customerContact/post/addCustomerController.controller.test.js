const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const customerContactController = require("../../../../controllers/customerContact.controller");
const customerContactService = require("../../../../services/customerContact");
describe("controller POST Customer Contact  test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(customerContactService, "addCustomerContact");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct Customer Contact object ", async () => {
    stubAdd.returns({
      data: fixture.customerContactDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.customerContactDataTestWithoutID },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.addCustomerContact(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.customerContactDataTest,
    });
  });
  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { mail: fixture.customerContactDataTestWithoutID.mail },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.addCustomerContact(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
  it("Throw An Internal Error", async () => {
    stubAdd.returns({
      err: { message: "Something Wrong" },
      status: "error",
    });
    let req = {
      body: { mail: fixture.customerContactDataTestWithoutID.mail },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.addCustomerContact(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Something Wrong",
    });
  });
});
