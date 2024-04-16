const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");

const updateTypeService = require("../../../../services/type/update");
const Type = require("../../../../models/Type");
const fixture = require("../fixture.json");

chai.use(sinonChai);

describe("testing UPDATE Type service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndUpdateStub;
  let findOneStub;
  beforeEach("", () => {
    findOneAndUpdateStub = sandbox.stub(Type, "findOneAndUpdate");
    findOneStub = sandbox.stub(Type, "findOne");
  });
  it("expect to return an success object", async () => {
    findOneAndUpdateStub.returns(fixture.typeDataTest);
    findOneStub.returns(fixture.typeDataTest);
    const res = await updateTypeService(
      { _id: fixture.typeDataTest._id },
      fixture.typeDataTest
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.typeDataTest._id },
      fixture.typeDataTest
    );
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: fixture.typeDataTest._id });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - no id", async () => {
    const res = await updateTypeService(
      { _id: undefined },
      fixture.typeDataTestWithoutID
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an fail object - wrong id", async () => {
    findOneAndUpdateStub.returns(undefined);
    const res = await updateTypeService(
      { _id: fixture.wrongID },
      fixture.typeDataTestWithoutID
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;
    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.wrongID },
      fixture.typeDataTestWithoutID
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    findOneAndUpdateStub.throws(new Error());
    const res = await updateTypeService(
      { _id: fixture.typeDataTest._id },
      fixture.typeDataTestWithoutID
    );

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
