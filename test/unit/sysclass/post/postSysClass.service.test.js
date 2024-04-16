const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
const mongoose = require("mongoose");

const fixture = require("../fixture.json");
const addSysClassService = require("../../../../services/sysclass/add");
const SysClass = require("../../../../models/SysClass");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe("testing POST system class service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(SysClass, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("expect to return an success object", async () => {
    createStub.returns(fixture.SysClassDataTest);

    const res = await addSysClassService(fixture.SysClassDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.SysClassDataTestWithoutID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an success object - adding random property ", async () => {
    createStub.returns(fixture.SysClassDataTest);

    const res = await addSysClassService(fixture.wrongSysClassDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.wrongSysClassDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an error object - empty object", async () => {
    createStub.throws(
      new Error(mongooseError("sysclasse", ["libelle", "active"]))
    );
    const res = await addSysClassService(fixture.emptySysClassDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.emptySysClassDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(
      mongooseError("sysclasse", ["libelle", "active"])
    );
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an error object - missing property", async () => {
    const sysclassObject = { active: fixture.SysClassDataTest.active };
    createStub.throws(new Error(mongooseError("sysclasse", ["libelle"])));
    const res = await addSysClassService(sysclassObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(sysclassObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("sysclasse", ["libelle"]));
    expect(res.status).to.be.eq("error");
  });
});
