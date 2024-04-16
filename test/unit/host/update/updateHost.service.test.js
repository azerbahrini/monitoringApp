const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");

const updateHostService = require("../../../../services/host/updateHost");
const Host = require("../../../../models/Host");
const fixture = require("../fixture.json");

chai.use(sinonChai);

describe("testing UPDATE Host service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndUpdateStub;
  beforeEach("", () => {
    findOneAndUpdateStub = sandbox.stub(Host, "findOneAndUpdate");
  });
  it("expect to return an success object", async () => {
    findOneAndUpdateStub.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.hostDataTest,
      }),
    });
    const res = await updateHostService(
      fixture.hostDataTest._id,
      fixture.hostDataTestWithoutID
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.hostDataTest._id, isActive: true },
      fixture.hostDataTestWithoutID
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
    const res = await updateHostService(
      { _id: undefined },
      fixture.hostDataTestWithoutID
    );
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
    const res = await updateHostService(
      fixture.wrongID,
      fixture.hostDataTestWithoutID
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;
    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.wrongID, isActive: true },
      fixture.hostDataTestWithoutID,
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
    const res = await updateHostService(
      { _id: fixture.hostDataTest._id },
      fixture.hostDataTestWithoutID
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
