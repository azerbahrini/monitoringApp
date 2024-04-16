const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getAllMonitoringActivityService = require("../../../../services/monitoringActivity/getAll");
const MonitoringActivity = require("../../../../models/MonitoringActivity");

chai.use(sinonChai);

describe("testing get all Monitoring Activity service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(MonitoringActivity, "paginate");
  });
  afterEach(() => {
    findStub.restore();
  });
  it("expect to return an success object", async () => {
    findStub.returns(fixture.getAllPaignateMonitoringActivities);
    const res = await getAllMonitoringActivityService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.data.docs).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });
  it("expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllMonitoringActivityService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
