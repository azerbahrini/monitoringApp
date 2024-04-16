const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");

const updateResultService = require("../../../../services/result/update");
const Result = require("../../../../models/Result");
const fixture = require("./fixture.json");

chai.use(sinonChai);

describe("testing UPDATE Result service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndUpdateStub;
  const idTest = fixture.update.success.body.data.id;
  const unknownId = "60ef4e3f7221301cc8eaafrd";
  beforeEach("", () => {
    findOneAndUpdateStub = sandbox.stub(Result, "findOneAndUpdate");
  });
  it("expect to return an success object", async () => {
    const newResWithId = {
      _id: fixture.update.success.body.data.id,
      result: "hi",
      
    };
    const newResWithoutId = {
      result: "hi",
      
    };
    findOneAndUpdateStub.returns(newResWithId);
    const res = await updateResultService(
      idTest,
      newResWithoutId
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: idTest },
      newResWithoutId,
      {new: true}
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - no id", async () => {
    const newResWithoutId = {
      libelle: "hi",
      active: true,
    };

    const res = await updateResultService(
      undefined,
      newResWithoutId
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an fail object - wrong id", async () => {
    const newResWithoutId = {
     result: {name : "hi"},
      
    };
    findOneAndUpdateStub.returns(undefined);
    const res = await updateResultService(
      unknownId,
      newResWithoutId
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;
    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: unknownId },
      newResWithoutId,
      {new: true}
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    const res = await updateResultService();
    findOneAndUpdateStub.throws(new Error());
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findOneAndUpdateStub.restore();
  });
  sandbox.restore();
});
