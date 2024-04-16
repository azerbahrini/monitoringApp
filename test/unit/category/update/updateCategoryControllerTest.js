const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("./fixture.json");
const categoryController = require("../../../../controllers/category.controller");
const categoryService = require("../../../../services/category");

describe("controller UPDATE Category test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(categoryService, "updateCategory");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new  Category ", async () => {
    stubUpdate.returns({
      data: fixture.update.success.body.data,
      status: "success",
    });
    let req = {
      body: { ...fixture.update.success.body.data },
      params: { id: fixture.update.success.body.data.id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await categoryController.updateCategory(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.update.success.body.data,
    });
  });
  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "Category not found" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: { ...fixture.update.success.body.data },
      params: { id: 123 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await categoryController.updateCategory(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Category not found",
    });
  });
  it("expect to return an error - Undefined Status Code", async () => {
    stubUpdate.returns({
      err: { message: "Category not found" },
      status: "error",
      // statusCode: 400, Undefined Status Code
    });
    let req = {
      body: { ...fixture.update.success.body.data },
      params: { id: 123 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await categoryController.updateCategory(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Category not found",
    });
  });
  it("expect to return an error - Invalid Status", async () => {
    stubUpdate.returns({
      err: { message: "Category not found" },
      status: "Invalid status",
      statusCode: 400,
    });
    let req = {
      body: { ...fixture.update.success.body.data },
      params: { id: 123 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await categoryController.updateCategory(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
  });
});
