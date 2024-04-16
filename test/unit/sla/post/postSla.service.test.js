const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const addSla = require("../../../../services/sla/addSla.service");
const Sla = require("../../../../models/Sla");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe(" POST Sla service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(Sla, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("Expect to return an success object", async () => {
    createStub.returns(fixture.slaDataTestWithoutID);

    const res = await addSla(fixture.slaDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.slaDataTestWithoutID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return a creation problem", async () => {
    createStub.returns(null);
    const res = await addSla(fixture.slaDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.slaDataTestWithoutID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.have.property("message");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
    expect(res.err.message).to.be.eq("Sla creation problem");
  });

  it("Expect to return an success object - adding random property ", async () => {
    createStub.returns(fixture.wrongSlaDataTest);

    const res = await addSla(fixture.wrongSlaDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.wrongSlaDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return an error object - empty object", async () => {
    createStub.throws(
      new Error(mongooseError("sla", ["label", "isActive", "rank"]))
    );
    const res = await addSla(fixture.emptySlaDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.emptySlaDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(
      mongooseError("sla", ["label", "isActive", "rank"])
    );
    expect(res.status).to.be.eq("error");
  });
  it("Expect to return an error object - missing property", async () => {
    const slaObject = { isActive: fixture.slaDataTest.isActive };
    createStub.throws(new Error(mongooseError("sla", ["label", "rank"])));
    const res = await addSla(slaObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(slaObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("sla", ["label", "rank"]));
    expect(res.status).to.be.eq("error");
  });
});
