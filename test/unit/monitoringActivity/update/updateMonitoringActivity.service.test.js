const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");

const updateMonitoringActivityService = require("../../../../services/monitoringActivity/update");
const MonitoringActivity = require("../../../../models/MonitoringActivity");
const fixture = require("../fixture.json");

chai.use(sinonChai);

describe("testing UPDATE Monitoring Activity service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndUpdateStub;
  beforeEach("", () => {
    findOneAndUpdateStub = sandbox.stub(MonitoringActivity, "findOneAndUpdate");
  });
  it("expect to return an success object", async () => {
    findOneAndUpdateStub.returns(fixture.activityDataTest);

    const res = await updateMonitoringActivityService(
      { _id: fixture.activityDataTest._id },
      fixture.activityDataTest
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.activityDataTest._id },
      fixture.activityDataTest
    );

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - no id", async () => {
    const res = await updateMonitoringActivityService(
      { _id: undefined },
      fixture.activityDataTestWithoutID
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an fail object - wrong id", async () => {
    findOneAndUpdateStub.returns(undefined);
    const res = await updateMonitoringActivityService(
      { _id: fixture.wrongID },
      fixture.activityDataTestWithoutID
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;
    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.wrongID },
      fixture.activityDataTestWithoutID
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    findOneAndUpdateStub.throws(new Error());
    const res = await updateMonitoringActivityService(
      { _id: fixture.activityDataTest._id },
      fixture.activityDataTestWithoutID
    );

    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findOneAndUpdateStub.restore();
  });
  sandbox.restore();
});
