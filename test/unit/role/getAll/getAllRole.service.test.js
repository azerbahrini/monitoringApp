const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getAllRoleService = require("../../../../services/role/getAllRole.service");
const Role = require("../../../../models/Role");

chai.use(sinonChai);

describe("GET ALL Role service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(Role, "paginate");
  });
  afterEach(() => {
    findStub.restore();
  });
  it("Expect to return an success object", async () => {
    const options = {
      offset: 1 * 1,
      limit: 1,
      pagination: true
    }
    findStub.returns(fixture.arrayofRoles);
    const res = await getAllRoleService(true,1, 1,{
      isActive: true,
      label: {$ne: "Team Leader"} 
    });
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllRoleService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
