const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("./fixture.json");
const systemController = require("../../../../controllers/system.controller");
const systemService = require("../../../../services/system");

describe("controller get types by Customer category  test ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(
      systemService,
      "getAllTypesByCustomerIdCategoryId"
    );
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("expect to send system by that ID", async () => {
    stubGetById.returns({
      data: fixture.all.success.body.data,
      status: "success",
    });
    let customer = fixture.all.success.body.data.docs[0].customer;
    let category = fixture.all.success.body.data.docs[0].category;

    let req = {
      params: { customer_Id: customer, category_Id: category },
    };

    let res = {};
    const data = [
      {
        _id: "608be0f0c5a2a0bd397294aa",
        type: "PRD",
      },
      {
        _id: "608be0f0c5a2a0bd397294aa",
        type: "PRD",
      },
      {
        _id: "608be0f0c5a2a0bd397294aa",
        type: "PRD",
      },
    ];
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getAllTypesByCustomerIdCategoryId(req, res);
    expect(stubGetById).to.be.calledWith(
      req.params.customer_Id,
      req.params.category_Id
    );
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.all.success.body.data,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "type not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: {
        customer_Id: "610d502489e61a36e88e1d27",
        category_Id: "608be4b7c5a2a005c87294b1",
      },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getAllTypesByCustomerIdCategoryId(req, res);
    expect(stubGetById).to.be.calledWith(
      req.params.customer_Id,
      req.params.category_Id
    );
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "type not found",
    });
  });

  it("expect to return an error - Missing customer & category ID in Query", async () => {
    stubGetById.returns({
      err: { message: "Missing customer & category ID" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getAllTypesByCustomerIdCategoryId(req, res);
    expect(stubGetById).to.be.calledWith();
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "Missing customer & category ID",
    });
  });
});
