const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("./fixture.json");
const categoryController = require("../../../../controllers/category.controller");
const categoryService = require("../../../../services/category");

describe("controller get category by id test ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(categoryService, "getCategoryById");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("expect to send category by that ID", async () => {
    stubGetById.returns({
      data: fixture.single.success.body.data,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.single.success.body.data[0].id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await categoryController.getCategoryById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.single.success.body.data,
    });
  });
  it("expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "Category not found" },
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
    await categoryController.getCategoryById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Category not found",
    });
  });
  it("expect to return an error - Invalid status", async () => {
    stubGetById.returns({
      err: { message: "Invalid status message" },
      status: "Invalid status",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: { id: 123 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await categoryController.getCategoryById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(stubGetById).to.have.been.calledWith(123);
  });
});
