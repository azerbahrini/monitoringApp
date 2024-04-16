const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const customerContactController = require("../../../../controllers/customerContact.controller");
const customerContactService = require("../../../../services/customerContact");
const systemService = require("../../../../services/system");
describe("controller Add Customer Contact to System  test ", () => {
  let stubGetbyIdCustomerContact;
  let stubGetbyIdSystem;
  let stubUpdateSystem;
  beforeEach(() => {
    stubGetbyIdCustomerContact = sinon.stub(
      customerContactService,
      "getCustomerContactById"
    );
    stubGetbyIdSystem = sinon.stub(systemService, "getSystemByIdService");
    stubUpdateSystem = sinon.stub(systemService, "updateSystemService");
  });
  afterEach(() => {
    stubGetbyIdCustomerContact.restore();
    stubGetbyIdSystem.restore();
    stubUpdateSystem.restore();
  });
  it("send a correct Request ", async () => {
    stubGetbyIdCustomerContact.returns({
      data: fixture.customerContactDataTest,
      status: "success",
    });
    stubGetbyIdSystem.returns({
      data: fixture.systemDataTest,
      status: "success",
    });
    stubUpdateSystem.returns({
      data: fixture.systemDataTest,
      status: "success",
    });
    let req = {
      body: { id: fixture.inexistantCustomerContact },
      params: { systemId: fixture.systemDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.addContactToSys(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.systemDataTest,
    });
  });
  it("Send Incorrect request - Customer Contact Doesn't exist ", async () => {
    stubGetbyIdCustomerContact.returns({
      err: { message: "Customer Contact not found" },
      status: "error",
      statusCode: 404,
    });

    let req = {
      body: { id: fixture.customerContactDataTest._id },
      params: { systemId: fixture.systemDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.addContactToSys(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "Customer Contact not found",
    });
  });
  it("Send Incorrect request - System Doesn't exist ", async () => {
    stubGetbyIdCustomerContact.returns({
      data: fixture.customerContactDataTest,
      status: "success",
    });
    stubGetbyIdSystem.returns({
      err: { message: "System not found" },
      status: "error",
      statusCode: 404,
    });

    let req = {
      body: { id: fixture.customerContactDataTest._id },
      params: { systemId: fixture.systemDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.addContactToSys(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "System not found",
    });
  });
  it("Send Incorrect request - Customer Contact Already exist in the System  ", async () => {
    stubGetbyIdCustomerContact.returns({
      data: fixture.customerContactDataTest,
      status: "success",
    });
    stubGetbyIdSystem.returns({
      data: fixture.systemDataTest,
      status: "success",
    });

    let req = {
      body: { id: fixture.customerContactDataTest._id },
      params: { systemId: fixture.systemDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.addContactToSys(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "customerContact already exists in the system",
    });
  });
  it("Throw an internal Error", async () => {
    stubGetbyIdCustomerContact.returns({
      data: fixture.customerContactDataTest,
      status: "success",
    });
    stubGetbyIdSystem.returns({
      data: fixture.systemDataTest,
      status: "success",
    });
    stubUpdateSystem.returns({
      err: { message: "something wrong" },
      status: "error",
    });
    let req = {
      body: { id: fixture.customerContactDataTest._id },
      params: { systemId: fixture.systemDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.addContactToSys(req, res);
    expect(res.status).to.have.been.calledWith(400);
  });
});
