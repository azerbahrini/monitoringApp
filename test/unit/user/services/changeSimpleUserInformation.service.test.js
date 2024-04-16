const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const changeSimpleUserInformation = require("../../../../services/user/changeSimpleUserInformation.service");
const User = require("../../../../models/User");

chai.use(sinonChai);

describe("Change User Information service", () => {
  const sandbox = sinon.createSandbox();
  let findOneStub;
  let findOneAndUpdateStub;
  beforeEach("", () => {
    findOneStub = sandbox.stub(User, "findOne");
    findOneAndUpdateStub = sandbox.stub(User, "findOneAndUpdate");
  });
  it("Expect to return an success object ", async () => {
    findOneAndUpdateStub.returns({
      lean: sinon.stub().returns({
        exec: () => fixture.returnedUser,
      }),
    });
    const res = await changeSimpleUserInformation(
      fixture.changeInformationUser,
      fixture.returnedUser._id
    );

    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an fail object - wrong id", async () => {
    findOneAndUpdateStub.returns({
      lean: sinon.stub().returns({
        exec: () => fixture.errorObject,
      }),
    });
    findOneAndUpdateStub.throws(new Error("wrong id error"));
    const res = await changeSimpleUserInformation(
      fixture.changeInformationUser,
      fixture.returnedUser._id
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
  it("Expect to throw an error", async () => {
    findOneStub.throws(new Error("random error"));
    const res = await changeSimpleUserInformation();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findOneStub.restore();
    findOneAndUpdateStub.restore();
  });
  sandbox.restore();
});
