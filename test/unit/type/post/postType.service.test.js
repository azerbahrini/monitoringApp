const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const mongoose = require("mongoose");

const fixture = require("../fixture.json");
const addTypeService = require("../../../../services/type/add");
const Type = require("../../../../models/Type");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe(" POST Type service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(Type, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("Expect to return an success object", async () => {
    createStub.returns(fixture.typeDataTestWithoutID);

    const res = await addTypeService(fixture.typeDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.typeDataTestWithoutID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return an success object - adding random property ", async () => {
    createStub.returns(fixture.wrongTypeDataTest);

    const res = await addTypeService(fixture.wrongTypeDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.wrongTypeDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return an error object - empty object", async () => {
    createStub.throws(new Error(mongooseError("type", ["type", "active"])));
    const res = await addTypeService(fixture.emptyTypeDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.emptyTypeDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("type", ["type", "active"]));
    expect(res.status).to.be.eq("error");
  });
  it("Expect to return an error object - missing property", async () => {
    const typeObject = { isActive: fixture.typeDataTest.active };
    createStub.throws(new Error(mongooseError("type", ["type"])));
    const res = await addTypeService(typeObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(typeObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("type", ["type"]));
    expect(res.status).to.be.eq("error");
  });
});
