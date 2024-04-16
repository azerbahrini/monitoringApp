const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
const fixture = require("./fixture.json");
const getOne = require("../../../../services/result/getOne");
const Result = require("../../../../models/Result");
chai.use(sinonChai);

describe("testing get One Result service", () => {
  let stubFindOne;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    stubFindOne = sinon.stub(Result, "findOne");
  });
  afterEach(() => {
    stubFindOne.restore();
  });

  it("expect to return an success object", async () => {
    stubFindOne.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.foundResult,
      }),
    });
    const res = await getOne("609089d12b4129a8102c875d");
    expect(stubFindOne).to.have.been.calledOnce;
    expect(stubFindOne).to.be.calledWith({ _id: "609089d12b4129a8102c875d" });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res).to.have.property("statusCode");
    expect(res.data).to.be.a("object");
    expect(res.statusCode).to.be.eq(200);
    expect(res.status).to.be.eq("success");
  });

  it("expect to return an error", async () => {
    stubFindOne.returns({
      lean: sandbox.stub().returns({
        exec: () => null,
      }),
    });
    const res = await getOne("609089d12b4129a8102c875d");
    expect(stubFindOne).to.have.been.calledOnce;
    expect(stubFindOne).to.be.calledWith({ _id: "609089d12b4129a8102c875d" });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res).to.have.property("statusCode");
    expect(res.err).to.be.a("object");
    expect(res.statusCode).to.be.eq(404);
    expect(res.status).to.be.eq("error");
  });

  it("Expect to throw an error", async () => {
    stubFindOne.throws(new Error("random error"));
    const res = await getOne("609089d12b4129a8102c875d");
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
