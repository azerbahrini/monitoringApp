const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getByIdSlaService = require("../../../../services/sla/getSlaById.service");
const Sla = require("../../../../models/Sla");

chai.use(sinonChai);

describe("GET BY ID Sla service", () => {
  const sandbox = sinon.createSandbox();
  let findOneStub;
  beforeEach("", () => {
    findOneStub = sandbox.stub(Sla, "findOne");
  });
  it("Expect to return an success object", async () => {
    findOneStub.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.slaDataTest,
      }),
    });
    expect(fixture.slaDataTest._id).to.be.a("string");
    const res = await getByIdSlaService(fixture.slaDataTest._id);
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: fixture.slaDataTest._id });

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

    const res = await getByIdSlaService(fixture.wrongID);
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({
      _id: fixture.wrongID,
    });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("Expect to throw an error", async () => {
    findOneStub.throws(new Error("random error"));
    const res = await getByIdSlaService();
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
