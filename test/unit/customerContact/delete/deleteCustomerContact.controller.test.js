const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const customerContactController = require("../../../../controllers/customerContact.controller");
const customerContactService = require("../../../../services/customerContact");
const System = require("../../../../models/System");
describe("controller DELETE Customer Contact test ", () => {
  let stubDelete;
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(customerContactService, "getCustomerContactById");
    stubDelete = sinon.stub(customerContactService, "deleteCustomerContact");
    findSystemStub = sinon.stub(System, "find");
  });
  afterEach(() => {
    stubDelete.restore();
    stubGetById.restore();
    findSystemStub.restore();
  });
  it("expect to send Customer Contact by that ID", async () => {
    stubGetById.returns({
      data: fixture.customerContactDataTest,
      status: "success",
    });
    findSystemStub.returns(fixture.arrayOfSystem);
    stubDelete.returns({
      data: fixture.customerContactDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: "5fd1e65f93dd352dbcbf8cc6" },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.deleteCustomerContact(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.customerContactDataTest,
    });
  });
  it("expect to return an error - Wrong Id", async () => {
    stubGetById.returns({
      err: { message: "customer contact not found " },
      status: "error",
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.deleteCustomerContact(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "customer contact not found ",
    });
  });
  it("expect to return an error - Missing ID", async () => {
    stubGetById.returns({
      err: { message: "missing ID" },
      status: "error",
    });
    let req = {
      body: {},
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.deleteCustomerContact(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing ID",
    });
  });
  it("expect to send Customer Contact by that ID", async () => {
    stubGetById.returns({
      data: fixture.customerContactDataTest,
      status: "success",
    });
    findSystemStub.returns(fixture.arrayOfSystem);
    stubDelete.returns({
      err: { message: "Something Wrong" },
      status: "error",
    });
    let req = {
      body: {},
      params: { id: "5fd1e65f93dd352dbcbf8cc6" },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerContactController.deleteCustomerContact(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Something Wrong",
    });
  });
});
