const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getSlaBySlaContractIdService = require("../../../../services/sla/getSlaBySlaContractIdService");
const Sla = require("../../../../models/Sla");

chai.use(sinonChai);

describe("GET ALL Slas By System service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(Sla, "paginate");
  });
  afterEach(() => {
    findStub.restore();
  });
  it("Expect to return an success object", async () => {
    findStub.returns(fixture.arrayofSlas);
    const res = await getSlaBySlaContractIdService(
      fixture.slaDataTest.slaContract
    );

    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return success + Search Value", async () => {
    const page = 1;
    const size = 10;
    const searchValue = "test";
    findStub.returns(fixture.arrayofSlas);
    const res = await getSlaBySlaContractIdService(
      fixture.slaDataTest.slaContract, page, size, searchValue
    );

    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return error  - No Sla Exist with this slaContract Id", async () => {
    findStub.returns({totalDocs  : 0});
    const res = await getSlaBySlaContractIdService(
      fixture.slaDataTest.slaContract
    );
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("statusCode");
    expect(res).to.have.property("status");
    expect(res.err).to.have.property("message");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
    expect(res.statusCode).to.be.eq(404);
    expect(res.err.message).to.be.eq("No Sla Exist with this slaContract Id:"+fixture.slaDataTest.slaContract);
  });

  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getSlaBySlaContractIdService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
