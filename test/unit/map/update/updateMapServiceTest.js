const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
const updateMapService = require("../../../../services/map/update");
const Map = require("../../../../models/MonitoringActivityPlannification");
const fixture = require("../fixture.json");

chai.use(sinonChai);

describe("testing UPDATE Map service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndUpdateStub;
  let findOneStub;
  beforeEach("", () => {
    findOneAndUpdateStub = sandbox.stub(Map, "findOneAndUpdate");
    findOneStub = sandbox.stub(Map, "findOne");
  });
  it("expect to return an success object", async () => {
    findOneAndUpdateStub.returns(fixture.MapDataTest);
    findOneStub.returns(fixture.MapDataTest);
    const res = await updateMapService(
      { _id: fixture.MapDataTest._id },
      fixture.MapDataTestWithoutID
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.MapDataTest._id },
      fixture.MapDataTestWithoutID
    );
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: fixture.MapDataTest._id });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - no id", async () => {
    const res = await updateMapService(
      { _id: undefined },
      fixture.MapDataTestWithoutID
    );
   
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an fail object - wrong id", async () => {
    findOneAndUpdateStub.returns(undefined);
    const res = await updateMapService(
      { _id: fixture.wrongID },
      fixture.MapDataTestWithoutID
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;
    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.wrongID },
      fixture.MapDataTestWithoutID
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    const res = await updateMapService();
    findOneAndUpdateStub.throws(new Error());
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findOneAndUpdateStub.restore();
    findOneStub.restore();
  });
  sandbox.restore();
});
