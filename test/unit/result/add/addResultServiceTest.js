const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
const mongoose = require("mongoose");

const fixture = require("./fixture.json");
const addResultService = require("../../../../services/result/add");
const Result = require("../../../../models/Result");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe("testing add service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(Result, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("expect to return an success object", async () => {
    const resultObject = {
      result: fixture.add.success.body.data[0].result,
      active: fixture.add.success.body.data[0].host,
      active: fixture.add.success.body.data[0].client,
      active: fixture.add.success.body.data[0].task,
    };

    createStub.returns(fixture.add.success.body.data[0]);

    const res = await addResultService(resultObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(resultObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an success object - adding random property ", async () => {
    const resultObject = {
      result: fixture.add.success.body.data[0].result,
      active: fixture.add.success.body.data[0].active,
      name: "test",
    };

    createStub.returns(fixture.add.success.body.data[0]);

    const res = await addResultService(resultObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(resultObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an error object - empty object", async () => {
    const resultObject = {};
    createStub.throws(
      new Error(mongooseError("result", ["result", "host","task","client"]))
    );
    const res = await addResultService(resultObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(resultObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    //expect(res.err).to.be.a("object");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(
        mongooseError("result", ["result", "host","task","client"])
    );
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an error object - missing property", async () => {
    const resultObject = { active: fixture.add.success.body.data[0].result };
    createStub.throws(new Error(mongooseError("result", ["result"])));
    const res = await addResultService(resultObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(resultObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    //expect(res.err).to.be.a("object");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("result", ["result"]));
    expect(res.status).to.be.eq("error");
  });
});
