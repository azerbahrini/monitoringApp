const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const systemController = require("../../../../controllers/system.controller");
const systemService = require("../../../../services/system");

describe("controller update system test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(systemService, "updateSystemService");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new system ", async () => {
    stubUpdate.returns({
      data: fixture.SystemDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.SystemDataTestWithoutID },
      params: { id: fixture.SystemDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.updateSystemController(req, res);
    expect(stubUpdate).to.be.calledWith(req.body,req.params.id);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.SystemDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "system not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.SystemDataTestWithoutID },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.updateSystemController(req, res);
    expect(stubUpdate).to.be.calledWith(req.body,req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "system not found",
    });
  });
});
