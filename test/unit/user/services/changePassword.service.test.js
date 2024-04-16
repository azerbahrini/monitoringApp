const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const bcrypt = require("bcryptjs");

const fixture = require("../fixture.json");
const changePasswordService = require("../../../../services/user/changePassword.service");
const User = require("../../../../models/User");

chai.use(sinonChai);

describe("Change Password service", () => {
  const sandbox = sinon.createSandbox();
  let findByIdStub;
  let compareStub;
  let findOneAndUpdateStub;
  beforeEach("", () => {
    findByIdStub = sandbox.stub(User, "findById");
    findOneAndUpdateStub = sandbox.stub(User, "findOneAndUpdate");
    compareStub = sandbox.stub(bcrypt, "compare");
  });





  it("Expect to return an success object ", async () => {
    findByIdStub.returns(fixture.returnedUser);
    compareStub.returns(true);
    findOneAndUpdateStub.returns({
    
        lean: sinon.stub().returns({
          exec: () => fixture.returnedUser,
        }),
    
    });

    const res = await changePasswordService(
      fixture.changePasswordUser,
      fixture.returnedUser._id
    );

   
    expect(findByIdStub).to.have.been.calledOnce;
    expect(compareStub).to.have.been.calledOnce;
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an fail object - wrong id", async () => {
    findByIdStub.returns(undefined);

    const res = await changePasswordService(
      fixture.changePasswordUser,
      fixture.returnedUser._id
    );
    expect(findByIdStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("Expect to return an fail object - wrong current password", async () => {
    findByIdStub.returns(fixture.returnedUser);
    compareStub.returns(false);

    const res = await changePasswordService(
      fixture.changePasswordUser,
      fixture.returnedUser._id
    );
    expect(findByIdStub).to.have.been.calledOnce;
    expect(compareStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("Expect to throw an error", async () => {
    findByIdStub.throws(new Error("random error"));
    const res = await changePasswordService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findByIdStub.restore();
    compareStub.restore();
    findOneAndUpdateStub.restore();
  });
  sandbox.restore();
});
