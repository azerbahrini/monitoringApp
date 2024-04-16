const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const moment = require("moment");
const fixture = require("../fixture.json");
const getLatesSyncShiftLogService = require("../../../../services/syncShiftLog/getLastSyncLog");
const SyncShiftLog = require("../../../../models/shiftSyncLog");

chai.use(sinonChai);
var assert = chai.assert;
describe("GET SyncShiftLog service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(SyncShiftLog, "find");
  });
  afterEach(() => {
    findStub.restore();
  });
  it("Expect to return an success object", async () => {
    findStub.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => fixture.getLatest.data,
        }),
      }),
    });
    const res = await getLatesSyncShiftLogService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an success object and shiftsSyncDate < 0", async () => {
    findStub.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => fixture.getLatestWithEmptyDate.data,
        }),
      }),
    });

    const res = await getLatesSyncShiftLogService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an success object Without shiftSyncDate", async () => {
    findStub.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => fixture.getLatestWithoutDate.data,
        }),
      }),
    });

    const res = await getLatesSyncShiftLogService();
    expect(findStub).to.have.been.calledOnce;
  });

  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getLatesSyncShiftLogService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
