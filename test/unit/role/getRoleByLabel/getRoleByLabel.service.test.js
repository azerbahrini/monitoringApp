const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getRoleByLabel = require("../../../../services/role/getRoleByLabel.service");
const Role = require("../../../../models/Role");

chai.use(sinonChai);

describe("GET  Role By Label service", () => {
  let sandbox = sinon.createSandbox();
  let findOne;
  beforeEach(() => {
    findOne = sandbox.stub(Role, "findOne");
  });
  afterEach(() => {
    findOne.restore();
  });
  it("Expect to return an success object", async () => {
    findOne.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.returnedRole,
      }),
    });
    const res = await getRoleByLabel("Team Leader");

    expect(findOne).to.have.been.calledOnce;
    expect(findOne).to.be.calledWith({ label: "Team Leader" });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res.data).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return a 404 error , Role Not Found", async () => {
    findOne.returns({
      lean: sandbox.stub().returns({
        exec: () => null,
      }),
    });
    const res = await getRoleByLabel("Invalid Label");
    expect(findOne).to.have.been.calledOnce;
    expect(findOne).to.be.calledWith({ label: "Invalid Label" });
    expect(res).to.be.a("object");
    expect(res.err).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res).to.have.property("statusCode");
    expect(res.err).to.have.property("message");
    expect(res.err.message).to.be.eq("Role not found");
    expect(res.status).to.be.eq("error");
    expect(res.statusCode).to.be.eq(404);
  });

  it("Expect to throw an exception", async () => {
    findOne.throws(new Error("Random error"));
    const res = await getRoleByLabel();
    expect(findOne).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
