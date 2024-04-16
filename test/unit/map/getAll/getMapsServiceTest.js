const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getAllMapsService = require("../../../../services/map/getAll");
const Map = require("../../../../models/MonitoringActivityPlannification");

chai.use(sinonChai);

describe("testing get all Maps service", () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(Map, "paginate");
  });
  afterEach(() => {
    findStub.restore();
  });

  it("expect to return an success object", async () => {
    findStub.returns({ docs: fixture.arrayofMapes });
    const res = await getAllMapsService(1, 2);
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith({});
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data.docs).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllMapsService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
