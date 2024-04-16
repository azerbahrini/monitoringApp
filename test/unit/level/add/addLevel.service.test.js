const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const addLevelService = require("../../../../services/level/add");
const Level = require("../../../../models/Level");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe(" POST Level service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(Level, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("Expect to return an success object", async () => {
    createStub.returns(fixture.levelDataTestWithoutID);

    const res = await addLevelService(fixture.levelDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.levelDataTestWithoutID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return an success object - adding random property ", async () => {
    createStub.returns(fixture.wrongLevelDataTest);

    const res = await addLevelService(fixture.wrongLevelDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.wrongLevelDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return an error object - empty object", async () => {
    createStub.throws(new Error(mongooseError("level", ["label"])));
    const res = await addLevelService(fixture.emptyLevelDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.emptyLevelDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("level", ["label"]));
    expect(res.status).to.be.eq("error");
  });
  it("Expect to return an error object - missing property", async () => {
    createStub.throws(new Error(mongooseError("level", ["label"])));
    const res = await addLevelService(fixture.levelDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.levelDataTestWithoutID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("level", ["label"]));
    expect(res.status).to.be.eq("error");
  });
});
