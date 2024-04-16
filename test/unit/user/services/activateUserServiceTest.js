const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const activateUserService = require("../../../../services/user/activateUser");
const User = require("../../../../models/User");
const fixture = require("../fixture.json");

chai.use(sinonChai);

describe("testing Activate User service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndUpdateStub;
  beforeEach("", () => {
    findOneAndUpdateStub = sandbox.stub(User, "findOneAndUpdate");
  });
  it("expect to return an success object", async () => {
    findOneAndUpdateStub.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.returnedUser,
      }),
    });
    const res = await activateUserService(fixture.returnedUser._id , false);
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: fixture.returnedUser._id} ,{status : false}
    );

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - no id", async () => {
    const res = await activateUserService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an fail object - wrong id", async () => {
    findOneAndUpdateStub.returns(undefined);
    const res = await activateUserService(fixture.wrongID);
    expect(findOneAndUpdateStub).to.have.been.calledOnce;
    expect(findOneAndUpdateStub).to.be.calledWith({ _id: fixture.wrongID });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    findOneAndUpdateStub.throws(new Error());
    const res = await activateUserService(fixture.returnedUser._id);

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
