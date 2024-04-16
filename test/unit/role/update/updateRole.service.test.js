const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");

const updateRoleService = require("../../../../services/role/updateRole.service");
const Role = require("../../../../models/Role");
const fixture = require("../fixture.json");

chai.use(sinonChai);

describe("testing UPDATE Role service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndUpdateStub;
  beforeEach("", () => {
    findOneAndUpdateStub = sandbox.stub(Role, "findOneAndUpdate");
  });
  it("expect to return an success object", async () => {
    findOneAndUpdateStub.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.roleDataTest,
      }),
    });
    const res = await updateRoleService(
      fixture.roleDataTest._id,
      fixture.roleDataTestWithoutID
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.roleDataTest._id },
      fixture.roleDataTestWithoutID
    );
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
    const res = await updateRoleService(
      { _id: undefined },
      fixture.roleDataTestWithoutID
    );
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
    const res = await updateRoleService(
      fixture.wrongID,
      fixture.roleDataTestWithoutID
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;
    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.wrongID },
      fixture.roleDataTestWithoutID,
      { new: true }
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    findOneAndUpdateStub.throws(new Error());
    const res = await updateRoleService(
      { _id: fixture.roleDataTest._id },
      fixture.roleDataTestWithoutID
    );

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
