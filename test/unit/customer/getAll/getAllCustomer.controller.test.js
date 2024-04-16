const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const fixture = require("../fixture.json");
const customerController = require("../../../../controllers/customer.controller");
const customerService = require("../../../../services/customer");

describe("controller GET ALL Customer test ", () => {
  let stubGetAll;
  beforeEach(() => {
    stubGetAll = sinon.stub(customerService, "getAllCustomerService");
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it("expect to send all customer ", async () => {
    stubGetAll.returns({
      data: fixture.arrayofCustomers,
      status: "success",
    });
    let req = { body: {}, params: {}, query: { page: 0, size: 2 }  };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerController.getAllCustomer(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofCustomers,
    });
  });
  it("expect to send all customer + route + method + ip ", async () => {
    stubGetAll.returns({
      data: fixture.arrayofCustomers,
      status: "success",
    });
    let req = {
      body: {},
      params: {},
      query: { page: 0, size: 2 },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerController.getAllCustomer(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofCustomers,
    });
  });

  it("expect to send all customer   only Active", async () => {
    stubGetAll.returns({
      data: fixture.arrayofCustomers,
      status: "success",
    });
    const isActive = true;
    let req = { body: {}, params: {}, query: { page: 0, size: 2, isActive } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerController.getAllCustomer(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofCustomers,
    });
  });
  
  it("expect to return an error", async () => {
    stubGetAll.returns({
      err: { message: "An error message" },
      status: "error",
    });
    const isActive = true;
    let req = { body: {}, params: {}, query: { page: 0, size: 2, isActive } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerController.getAllCustomer(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: "An error message" });
  });

  it("expect to return an error  + route + method + ip ", async () => {
    stubGetAll.returns({
      err: { message: "An error message" },
      status: "error",
    });
    const isActive = true;
    let req = {
      body: {},
      params: {},
      query: { page: 0, size: 2, isActive },
      query: { page: 0, size: 2 },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerController.getAllCustomer(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: "An error message" });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubGetAll.returns({
      err: { message: "invalidStatus" },
      status: "invalidStatus",
    });
    let req = { body: {}, params: {}, query: { page: 0, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerController.getAllCustomer(req, res);
    expect(stubGetAll).to.be.calledOnce;
  });
});
