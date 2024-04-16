const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const typeController = require("../../../../controllers/type.controller");
const typeService = require("../../../../services/type");

describe("GET BY ID type Controller ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(typeService, "getByIdTypeService");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("Expect to send Type by that ID", async () => {
    stubGetById.returns({
      data: fixture.typeDataTest,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.typeDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await typeController.getTypeById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.typeDataTest,
    });
  });
  it("Expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "type not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: { id: 123 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await typeController.getTypeById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "type not found",
    });
  });
  it("Expect to return an error - Without statusCode", async () => {
    stubGetById.returns({
      err: { message: "error message" },
      status: "error",
      // statusCode: 404, Without statusCode
    });
    let req = {
      body: {},
      params: { id: 123 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await typeController.getTypeById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "error message",
    });
  });
});
