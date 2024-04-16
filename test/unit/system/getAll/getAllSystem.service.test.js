const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getAllSystem = require("../../../../services/system/getAll");
const System = require("../../../../models/System");

chai.use(sinonChai);

describe("GET ALL System service", () => {
  let sandbox = sinon.createSandbox();
  let paginateStub;
  beforeEach(() => {
    paginateStub = sandbox.stub(System,"paginate");
  });
  afterEach(() => {
    paginateStub.restore();
  });
  it("Expect to return an success object", async () => {
    paginateStub.returns(fixture.arrayofSystems);
    const res = await getAllSystem();

    expect(res).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("success");
    expect(res).to.have.property("data");
    expect(res.data).to.be.a("array");
    
  });
  it("Expect to throw an exception", async () => {
    paginateStub.throws(new Error("Random error"));
    const res = await getAllSystem();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
