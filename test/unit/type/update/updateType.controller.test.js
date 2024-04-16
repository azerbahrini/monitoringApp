const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const typeController = require("../../../../controllers/type.controller");
const typeService = require("../../../../services/type");

describe("controller UPDATE type test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(typeService, "updateTypeService");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new type ", async () => {
    stubUpdate.returns({
      data: fixture.typeDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.typeDataTest },
      params: { id: fixture.typeDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await typeController.updateSystemType(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.typeDataTest,
    });
  });
  it("expect to return an error - Without statusCode", async () => {
    stubUpdate.returns({
      err: { message: "type not found" },
      status: "error",
      // statusCode: 404, without StatusCode
    });
    let req = {
      body: { ...fixture.typeDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await typeController.updateSystemType(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "type not found",
    });
  });
  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "type not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.typeDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await typeController.updateSystemType(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "type not found",
    });
  });
});
