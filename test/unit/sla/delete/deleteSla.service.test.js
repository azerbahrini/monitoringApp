const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");

const deleteSlaService = require("../../../../services/sla/deleteSla.service");
const Sla = require("../../../../models/Sla");
const fixture = require("../fixture.json");

chai.use(sinonChai);

describe("testing DELETE Sla service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndUpdateStub;
  beforeEach("", () => {
    findOneAndUpdateStub = sandbox.stub(Sla, "findOneAndUpdate");
  });
  it("expect to return an success object", async () => {
    findOneAndUpdateStub.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.slaDataTest,
      }),
    });
    const res = await deleteSlaService(fixture.slaDataTest._id);
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.slaDataTest._id, isActive: true },
      { isActive: false },
      { new: true }
    );

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - no id", async () => {
    findOneAndUpdateStub.returns({
      lean: sandbox.stub().returns({
        exec: () => undefined,
      }),
    });
    const res = await deleteSlaService(undefined);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an fail object - wrong id", async () => {
    findOneAndUpdateStub.returns({
      lean: sandbox.stub().returns({
        exec: () => undefined,
      }),
    });
    const res = await deleteSlaService(fixture.wrongID);
    expect(findOneAndUpdateStub).to.have.been.calledOnce;
    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.wrongID, isActive: true },
      { isActive: false },
      { new: true }
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    findOneAndUpdateStub.throws(new Error());
    const res = await deleteSlaService(fixture.slaDataTest._id);

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
