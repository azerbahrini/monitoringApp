const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const roleHistoryController = require("../../../../controllers/roleHistory.controller");
const roleHistoryService = require("../../../../services/roleHistory");

describe("GET BY roleHistory type Controller ", () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(roleHistoryService,"getRoleHistoryByIdService");
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it("Expect to send roleHistory by that ID", async () => {
    stubGetById.returns({
      data: fixture.roleHistory,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.roleHistory._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.getRoleHistoryByIdController(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.roleHistory,
    });
  });
  it("Expect to return an error - ID Does not exist", async () => {
    stubGetById.returns({
      err: { message: "role history not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.getRoleHistoryByIdController(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({ message: "role history not found" });
  });

  it("Expect to return an error - Without Status Code", async () => {
    stubGetById.returns({
      err: { message: "role history not found" },
      status: "error",
      // statusCode: 404, without status Code
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.getRoleHistoryByIdController(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: "role history not found" });
  });

  it("expect to return an error - Invalid Status", async () => {
    stubGetById.returns({
      err: { message: "invalidStatus" },
      status: "invalidStatus",
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await roleHistoryController.getRoleHistoryByIdController(req, res);
    expect(stubGetById).to.be.calledOnce;
  });

});
