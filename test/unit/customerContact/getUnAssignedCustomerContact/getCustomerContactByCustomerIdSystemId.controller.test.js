const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");

const customerContactController = require("../../../../controllers/customerContact.controller");
const customerContactService = require("../../../../services/customerContact");

describe("controller : GET ALL unssigned Customer Contacts", () => {
  const dataFixture = {
    customerId: "5fd1e65f93dd352dbcbf8cc6",
    WrongID: "5fd1e65f93dd352dbcbf8cc0",
    systemDataTest: {
      _id: "5fd1e65f93dd352dbcbf8cc1",
      system: "systemName",
      listCustomerContact: [
        "5fd1e65f93dd352dbcbf8cc9",
        "5fd1e65f93dd352dbcbf8cc7",
        "5fd1e65f93dd352dbcbf8cc8",
      ],
    },
  };
  let stubGetByCustomerBySystem;
  beforeEach(() => {
    stubGetByCustomerBySystem = sinon.stub(
      customerContactService,
      "getUnassignedCustomerContactBySystem"
    );
  });
  afterEach(() => {
    stubGetByCustomerBySystem.restore();
  });
  it("sends Valid request - Get Unassigned customer contacts by system", async () => {
    stubGetByCustomerBySystem.returns({
      data: fixture.customerContactDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: {
        customerId: dataFixture.customerId,
        systemId: dataFixture.systemDataTest._id,
      },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.getUnassignedCustomerContactBySystem(
      req,
      res
    );
    expect(stubGetByCustomerBySystem).to.be.calledWith(
      req.params.customerId,
      req.params.systemId
    );
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.customerContactDataTest,
    });
  });
  it("Sends an Invalid request - ID Does not exist", async () => {
    stubGetByCustomerBySystem.returns({
      err: { message: "System not found !" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: {
        customerId: dataFixture.customerId,
        systemId: "5fd1e65f93dd352dbcbf8cc6",
      },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.getUnassignedCustomerContactBySystem(
      req,
      res
    );
    expect(stubGetByCustomerBySystem).to.be.calledWith(
      req.params.customerId,
      req.params.systemId
    );
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "System not found !",
    });
  });
});
