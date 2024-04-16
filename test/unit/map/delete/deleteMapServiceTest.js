const sinon = require("sinon");

const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const deleteMapService = require("../../../../services/map/delete");
const Map = require("../../../../models/MonitoringActivityPlannification");

chai.use(sinonChai);

describe("testing delete by id system class service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndRemoveStub;
  beforeEach("", () => {
    findOneAndRemoveStub = sandbox.stub(Map, "findOneAndUpdate");
  });
  it("expect to return an success object", async () => {
    findOneAndRemoveStub.returns(fixture.MapDataTest);

    const res = await deleteMapService(fixture.MapDataTest._id);
    expect(findOneAndRemoveStub).to.have.been.calledOnce;
    expect(findOneAndRemoveStub).to.be.calledWith({
      _id: fixture.MapDataTest._id,
    });
    expect(fixture.MapDataTest._id).to.be.a("string");

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - no id", async () => {
    const res = await deleteMapService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an fail object - wrong id", async () => {
    findOneAndRemoveStub.returns(undefined);
    const res = await deleteMapService(fixture.wrongID);
    expect(findOneAndRemoveStub).to.have.been.calledOnce;
    expect(findOneAndRemoveStub).to.be.calledWith({ _id: fixture.wrongID });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    findOneAndRemoveStub.throws(new Error("message Error"));
    const res = await deleteMapService(fixture.wrongID);
    expect(findOneAndRemoveStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
  afterEach(() => {
    findOneAndRemoveStub.restore();
  });
  sandbox.restore();
});
