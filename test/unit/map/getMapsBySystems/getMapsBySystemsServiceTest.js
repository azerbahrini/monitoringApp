const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getMapsBySystemsService = require("../../../../services/map/getMapsBySystems");
const Map = require("../../../../models/MonitoringActivityPlannification");

chai.use(sinonChai);

describe("GET ALL Maps By Systems Ids service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(Map, "find");
  });
  afterEach(() => {
    findStub.restore();
  });

  it("Expect to return an success object", async () => {
    findStub.returns({
        populate: sandbox.stub().returns({
          lean: sandbox.stub().returns({
            exec: () => fixture.arrayofMapes,
          }),
      })
  });
    const res = await getMapsBySystemsService(["60ee0042d9b53b3e084209f5","60ee0042d9b53b3e084209f6"]);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.data[0]).to.have.property("periodicity");
    expect(res.data[0]).to.have.property("startTime");
    expect(res.data[0]).to.have.property("estimation");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getMapsBySystemsService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
