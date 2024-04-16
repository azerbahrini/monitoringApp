const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const getAllNomenclatureService = require("../../../../services/nomenclature/getAllNomenclature");
const Nomenclature = require("../../../../models/Nomenclature");
const fixture = require("../fixture.json");

chai.use(sinonChai);

describe("testing get all Nomenclature service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(Nomenclature, "find");
  });
  afterEach(() => {
    findStub.restore();
  });
  it("expect to return an success object", async () => {
    findStub.returns(fixture.docs);

    const res = await getAllNomenclatureService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("expect to return 204 No Content", async () => {
    findStub.returns(null);

    const res = await getAllNomenclatureService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("statusCode");
    expect(res).to.have.property("status");
    expect(res.err).to.have.property("message");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("success");
    expect(res.statusCode).to.be.eq(204);
    expect(res.err.message).to.be.eq("No Nomenclature found !");
  });

  it("expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllNomenclatureService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
