const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const getUserByPropertyService = require("../../../../services/user/findUserByProperty.service");
const User = require("../../../../models/User");

chai.use(sinonChai);

describe("GET BY Property service", () => {
  const sandbox = sinon.createSandbox();
  let findOneStub;
  beforeEach("", () => {
    findOneStub = sandbox.stub(User, "findOne");
  });

  it("Expect to return an success object - with the selectProperty", async () => {
    findOneStub.returns({
      populate: sandbox.stub().returns({
        select: sandbox.stub().returns({
          lean: sandbox.stub().returns({
            exec: () => fixture.returnedUser,
          }),
        }),
      }),
    });
    const res = await getUserByPropertyService(
      {
        _id: fixture.returnedUser._id,
      },
      "",
      "-password"
    );

    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: fixture.returnedUser._id });

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an success object - without the selectProperty", async () => {
    findOneStub.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => fixture.returnedUser,
        }),
      }),
    });

    const res = await getUserByPropertyService(
      {
        _id: fixture.returnedUser._id,
      },
      "",
      ""
    );
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: fixture.returnedUser._id });

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an fail object - wrong id", async () => {
    findOneStub.returns({
      populate: sandbox.stub().returns({
        select: sandbox.stub().returns({
          lean: sandbox.stub().returns({
            exec: () => undefined,
          }),
        }),
      }),
    });

    const res = await getUserByPropertyService(
      { _id: fixture.wrongId },
      "",
      "-password"
    );
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: fixture.wrongId });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("Expect to throw an error", async () => {
    findOneStub.throws(new Error("random error"));
    const res = await getUserByPropertyService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findOneStub.restore();
  });
  sandbox.restore();
});
