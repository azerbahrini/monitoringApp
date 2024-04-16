const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getByIdTypeService = require("../../../../services/type/getById");
const Type = require("../../../../models/Type");

chai.use(sinonChai);

describe("GET BY ID Type service", () => {
  const sandbox = sinon.createSandbox();
  let findOneStub;
  beforeEach("", () => {
    findOneStub = sandbox.stub(Type, "findOne");
  });
  it("Expect to return an success object", async () => {
    findOneStub.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.typeDataTest,
      }),
    });
    expect(fixture.typeDataTest._id).to.be.a("string");
    const res = await getByIdTypeService(fixture.typeDataTest._id);
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: fixture.typeDataTest._id });

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return an fail object - wrong id", async () => {
    findOneStub.returns({
      lean: sandbox.stub().returns({
        exec: () => {},
      }),
    });

    const res = await getByIdTypeService(fixture.wrongID);
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: fixture.wrongID });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("Expect to throw an error", async () => {
    findOneStub.throws(new Error("random error"));
    const res = await getByIdTypeService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findOneStub.restore();
  });
  sandbox.restore();
});
