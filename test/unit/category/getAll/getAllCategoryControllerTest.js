const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("./fixture.json");
const categoryController = require("../../../../controllers/category.controller");
const categoryService = require("../../../../services/category");

describe("controller get all test ", () => {
  let stubGetAll;
  beforeEach(() => {
    stubGetAll = sinon.stub(categoryService, "getAllCategoriesService");
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it("expect to send all Categories", async () => {
    stubGetAll.returns({
      data: fixture.all.success.body.data,
      status: "success",
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await categoryController.getAllCategory(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.all.success.body.data,
    });
  });
  it("expect to Only Active  Categories", async () => {
    stubGetAll.returns({
      data: fixture.all.success.body.data,
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
    await categoryController.getAllCategory(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.all.success.body.data,
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
    await categoryController.getAllCategory(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "error message",
    });
  });
  it("expect to return an error - Invalid status", async () => {
    stubGetAll.returns({
      err: { message: "error message" },
      status: "Invalid status",
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await categoryController.getAllCategory(req, res);
    expect(stubGetAll).to.be.calledOnce;
  });
});
