const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("./fixture.json");
const systemController = require("../../../../controllers/system.controller");
const systemService = require("../../../../services/system");

describe("controller get categories by Customer test ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(systemService, "getAllCategoriesByCustomerId");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("expect to send customer by that ID", async () => {
    stubGetById.returns({
      data: fixture.all.success.body.data,
      status: "success",
    });
    let customer = "610d502489e61a36e88e1d27";

    let req = {
      params: { customer_Id: customer },
    };

    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getAllCategoriesByCustomerId(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customer_Id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.all.success.body.data,
    });
  });
  it("expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "category not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: { customer_Id: "610d502489e61a36e88e1d27" },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getAllCategoriesByCustomerId(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customer_Id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "category not found",
    });
  });

  it("expect to return an error - Missing customer ID in Query", async () => {
    stubGetById.returns({
      err: { message: "Missing customer ID" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: { customer_Id: "610d502489e61a36e88e1d27" },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getAllCategoriesByCustomerId(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customer_Id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Missing customer ID",
    });
  });
});
