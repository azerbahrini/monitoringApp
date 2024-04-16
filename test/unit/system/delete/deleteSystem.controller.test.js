const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const systemController = require("../../../../controllers/system.controller");
const systemService = require("../../../../services/system");

describe("controller DELETE system test ", () => {
  let stubDelete;
  beforeEach(() => {
    stubDelete = sinon.stub(systemService, "deleteSystemService");
  });
  afterEach(() => {
    stubDelete.restore();
  });
  it("expect to return new system ", async () => {
    stubDelete.returns({
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
    await systemController.deleteSystem(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.SystemDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubDelete.returns({
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
    await systemController.deleteSystem(req, res);
    expect(stubDelete).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "system not found",
    });
  });
});
