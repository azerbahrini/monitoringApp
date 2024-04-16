const sinon = require("sinon");
const expect = require("chai").expect;
const fixture = require("../fixture.json");
const systemController = require("../../../../controllers/system.controller");
const systemService = require("../../../../services/system");

describe("GET BY ID system Controller ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(
      systemService,
      "getSystemByTypeByCategoryByCustomer"
    );
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("Expect to send system by that ID", async () => {
    stubGetById.returns({
      data: fixture.SystemDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: {
        customerId: fixture.SystemDataTest.customer,
        typeId: fixture.SystemDataTest.type,
        categoryId: fixture.SystemDataTest.category,
      },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getSystemByTypeByCategoryByCustomer(req, res);
    expect(stubGetById).to.be.calledWith(
      req.params.customerId,
      req.params.typeId,
      req.params.categoryId
    );
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.SystemDataTest,
    });
  });
  it("Expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "system not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: {
        customerId: fixture.wrongID,
        typeId: fixture.wrongID,
        categoryId: fixture.wrongID,
      },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getSystemByTypeByCategoryByCustomer(req, res);
    expect(stubGetById).to.be.calledWith(
      req.params.customerId,
      req.params.typeId,
      req.params.categoryId
    );
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({ message: "system not found" });
  });
});
