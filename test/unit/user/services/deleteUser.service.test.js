const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const deleteByIdUserService = require("../../../../services/user/deleteUserById.service");
const User = require("../../../../models/User");

chai.use(sinonChai);

describe("DELETE User By Id service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndRemoveStub;
  beforeEach("", () => {
    findOneAndRemoveStub = sandbox.stub(User, "findOneAndUpdate");
  });
  it("Expect to return an success object", async () => {
    findOneAndRemoveStub.returns(fixture.returnedUser);
    const res = await deleteByIdUserService(fixture.returnedUser._id);
    expect(findOneAndRemoveStub).to.have.been.calledOnce;
    expect(findOneAndRemoveStub).to.be.calledWith({
      _id: fixture.returnedUser._id,
    });

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return an fail object - wrong id", async () => {
    findOneAndRemoveStub.returns(undefined);

    const res = await deleteByIdUserService(fixture.wrongId);
    expect(findOneAndRemoveStub).to.have.been.calledOnce;
    expect(findOneAndRemoveStub).to.be.calledWith({ _id: fixture.wrongId });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("Expect to throw an error", async () => {
    findOneAndRemoveStub.throws(new Error("random error"));
    const res = await deleteByIdUserService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findOneAndRemoveStub.restore();
  });
  sandbox.restore();
});
