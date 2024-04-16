const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const typeController = require("../../../../controllers/type.controller");
const typeService = require("../../../../services/type");

describe("controller GET ALL Type test ", () => {
  let stubGetAll;
  beforeEach(() => {
    stubGetAll = sinon.stub(typeService, "getAllTypeService");
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it("expect to send all system classes", async () => {
    stubGetAll.returns({
      data: fixture.arrayOfTypes,
      status: "success",
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await typeController.getAllType(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayOfTypes,
    });
  });
  it("expect to send Only active Types", async () => {
    stubGetAll.returns({
      data: fixture.arrayOfTypes,
      status: "success",
    });
    let req = {
      body: {},
      params: {},
      query: { page: 2, size: 2, isActive: true },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await typeController.getAllType(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayOfTypes,
    });
  });

  it("expect to return an error", async () => {
    stubGetAll.returns({
      err: { message: "error message" },
      status: "error",
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await typeController.getAllType(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "error message",
    });
  });
});
