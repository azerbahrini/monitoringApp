const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");

const updateSysClassService = require("../../../../services/sysclass/update");
const SysClass = require("../../../../models/SysClass");
const fixture = require("../fixture.json");

chai.use(sinonChai);

describe("testing UPDATE system class service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndUpdateStub;
  let findOneStub;
  beforeEach("", () => {
    findOneAndUpdateStub = sandbox.stub(SysClass, "findOneAndUpdate");
    findOneStub = sandbox.stub(SysClass, "findOne");
  });
  it("expect to return an success object", async () => {
    findOneAndUpdateStub.returns(fixture.SysClassDataTest);
    findOneStub.returns(fixture.SysClassDataTest);
    const res = await updateSysClassService(
      { _id: fixture.SysClassDataTest._id },
      fixture.SysClassDataTestWithoutID
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.SysClassDataTest._id },
      fixture.SysClassDataTestWithoutID
    );
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: fixture.SysClassDataTest._id });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - no id", async () => {
    const res = await updateSysClassService(
      { _id: undefined },
      fixture.SysClassDataTestWithoutID
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an fail object - wrong id", async () => {
    findOneAndUpdateStub.returns(undefined);
    const res = await updateSysClassService(
      { _id: fixture.wrongID },
      fixture.SysClassDataTestWithoutID
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;
    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.wrongID },
      fixture.SysClassDataTestWithoutID
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    const res = await updateSysClassService();
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
