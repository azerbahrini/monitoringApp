const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const addMonitoringActivityService = require("../../../../services/monitoringActivity/add");
const MonitoringActivity = require("../../../../models/MonitoringActivity");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe(" POST Monitoring Activity service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(MonitoringActivity, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("Expect to return an success object", async () => {
    createStub.returns(fixture.activityDataTestWithoutID);

    const res = await addMonitoringActivityService(
      fixture.activityDataTestWithoutID
    );
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.activityDataTestWithoutID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return an success object - adding random property ", async () => {
    createStub.returns(fixture.wrongActivityDataTest);

    const res = await addMonitoringActivityService(
      fixture.wrongActivityDataTest
    );
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.wrongActivityDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return an error object - empty object", async () => {
    createStub.throws(new Error(mongooseError("type", ["type", "active"])));
    const res = await addMonitoringActivityService(
      fixture.emptyActivityDataTest
    );
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.emptyActivityDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("type", ["type", "active"]));
    expect(res.status).to.be.eq("error");
  });
  it("Expect to return an error object - missing property", async () => {
    const activityObject = { type: fixture.activityDataTestWithoutID.type };
    createStub.throws(
      new Error(
        mongooseError("MonitoringActivity", ["activity", "description"])
      )
    );
    const res = await addMonitoringActivityService(activityObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(activityObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(
      mongooseError("MonitoringActivity", ["activity", "description"])
    );
    expect(res.status).to.be.eq("error");
  });
});
