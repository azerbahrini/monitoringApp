const sinon = require("sinon");
const expect = require("chai").expect;
var chai = require('chai');
chai.use(require('sinon-chai'));
const fixture = require("../fixture.json");
const syncShiftLogController = require("../../../../controllers/shiftSyncLog.controller");
const syncShiftLogService = require("../../../../services/syncShiftLog");

describe("GET BY ID syncShiftLog Controller ", () => {
  let stubGetLatest;
  beforeEach(() => {
    stubGetLatest = sinon.stub(syncShiftLogService, "getLastSyncLog");
  });
  afterEach(() => {
    stubGetLatest.restore();
  });
  it("Expect to send Task by that ID", async () => {
    stubGetLatest.returns({
      data: fixture.getLatest,
      status: "success",
    });
    let req = {
      body: {},
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await syncShiftLogController.getLatestSyncLog(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.getLatest,
    });
  });
  it("Expect to return an error - ID Does not exist", async () => {
    stubGetLatest.returns({
      err: { message: "syncShiftLog not found" },
      status: "error",
      statusCode: 400,
    });
    let req = {
      body: {},
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await syncShiftLogController.getLatestSyncLog(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "syncShiftLog not found",
    });
  });
});
