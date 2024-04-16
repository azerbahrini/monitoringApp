const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
const systemService = require("../../../../services/system");
const fixture = require("../fixture.json");
const System = require("../../../../models/System");
chai.use(sinonChai);

describe("testing Add System Contact service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndUpdateStub;
  beforeEach("", () => {
    findOneAndUpdateStub = sandbox.stub(System, "findOneAndUpdate");
  });
  it("expect to return an success object", async () => {
      let data = {"listCustomerContact" : ["611f8e24b7123928c0e6dfff"]}
    findOneAndUpdateStub.returns({
      lean: sandbox.stub().returns({
        exec: () => data,
      }),
    });
    const res = await systemService.addCustomerContactToSystem(fixture.SystemDataTest._id);
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - no id", async () => {
    findOneAndUpdateStub.returns({
      lean: sandbox.stub().returns({
        exec: () => undefined,
      }),
    });
    const res = await systemService.addCustomerContactToSystem(undefined);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an fail object - wrong id", async () => {
    findOneAndUpdateStub.returns({
      lean: sandbox.stub().returns({
        exec: () => undefined,
      }),
    });
    const res = await systemService.addCustomerContactToSystem(fixture.wrongID);
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    findOneAndUpdateStub.throws(new Error());
    const res = await systemService.addCustomerContactToSystem(fixture.SystemDataTest._id);

    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
  it("Expect to throw an error", async () => {
    findOneAndUpdateStub.throws(new Error("random error"));
    const res = await systemService.deleteSystemService();

    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findOneAndUpdateStub.restore();
  });
  sandbox.restore();
});
