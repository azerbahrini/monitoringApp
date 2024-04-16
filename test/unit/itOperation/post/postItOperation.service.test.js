const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const addItOperationService = require("../../../../services/itOperation/addItOperation.service");
const ItOperation = require("../../../../models/ItOperation");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe(" POST ItOperation service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(ItOperation, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("Expect to return an success object", async () => {
    createStub.returns(fixture.itOperationDataTestWithoutID);

    const res = await addItOperationService(fixture.itOperationDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.itOperationDataTestWithoutID);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return an success object - adding random property ", async () => {
    createStub.returns(fixture.wrongItOperationDataTest);

    const res = await addItOperationService(fixture.wrongItOperationDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.wrongItOperationDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return a creation problem", async () => {
    createStub.returns(null);
    const res = await addItOperationService(fixture.wrongItOperationDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.wrongItOperationDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.have.property("message");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
    expect(res.err.message).to.be.eq("ItOperation creation problem");
  });

  it("expect to return an error object - empty object", async () => {
    createStub.throws(
      new Error(mongooseError("itOperation", ["title", "startDate"]))
    );
    const res = await addItOperationService(fixture.emptyItOperationDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.emptyItOperationDataTest);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(
      mongooseError("itOperation", ["title", "startDate"])
    );
    expect(res.status).to.be.eq("error");
  });
});
