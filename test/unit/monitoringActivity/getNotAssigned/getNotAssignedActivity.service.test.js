const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getNotAssignedActivity = require("../../../../services/monitoringActivity/notAssignedActivity");
const MonitoringActivity = require("../../../../models/MonitoringActivity");
const MAPS = require("../../../../models/MonitoringActivityPlannification");

chai.use(sinonChai);

describe("testing get Not Assigned Monitoring Activity service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(MonitoringActivity, "find");
    findStubMAPS = sandbox.stub(MAPS, "find");
  });
  afterEach(() => {
    findStub.restore();
    findStubMAPS.restore();
  });
  it("expect to return an success object", async () => {
    findStub.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.arrayofActivities,
      }),
    });

    findStubMAPS.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => fixture.arrayofMAPS,
        }),
      }),
    });
    const res = await getNotAssignedActivity(fixture.systemID);
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith({isActive:true});
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });
  it("expect to throw an exception", async () => {
    findStubMAPS.throws(new Error("Random error"));
    const res = await getNotAssignedActivity(fixture.systemID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
