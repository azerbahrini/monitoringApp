const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getAllRoleHistory = require("../../../../services/roleHistory/getAll");
const RoleHistory = require("../../../../models/RoleHistory");

chai.use(sinonChai);

describe("GET ALL RoleHistory service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(RoleHistory,"paginate");
  });
  afterEach(() => {
    findStub.restore();
  });
  it("Expect to return an success object", async () => {
    findStub.returns(fixture.arrayofRoleHistory);
    const res = await getAllRoleHistory();

    expect(res).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("success");
    expect(res).to.have.property("data");
    expect(res.data).to.be.a("array");
    
  });
  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllRoleHistory();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
