const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const userController = require("../../../../controllers/user.controller");
const userService = require("../../../../services/user");
const User = require("../../../../models/User");

chai.use(sinonChai);
describe("controller Get Microsoft User  test ", () => {
  let findUserByPropertyStub;
  let findOneStub;
  beforeEach(() => {
    findUserByPropertyStub = sinon.stub(userService, "findUserByProperty");
    findOneStub = sinon.stub(User, "findOne");
  });
  afterEach(() => {
    findUserByPropertyStub.restore();
    findOneStub.restore();
  });

  it("return a list of users ", async () => {
    findUserByPropertyStub.returns({
      data: fixture.returnedUser,
      status: "success",
    });
    let req = {
      body: { microsoftId: fixture.microsoftId },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.getMUser(req, res);
    expect(findUserByPropertyStub).calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.returnedUser,
    });
  });
  it("return an error object - inexistant microsoft user ", async () => {
    findUserByPropertyStub.returns({
      err: { message: "user not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { microsoftId: fixture.microsoftId },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.getMUser(req, res);
    expect(findUserByPropertyStub).calledOnce;
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "user not found",
    });
  });
  // it("throw an internal error ", async () => {
  //   findOneStub.throws(new Error("random error"));
  //   let req = {
  //     body: { microsoftId: fixture.microsoftId },
  //     params: {},
  //   };
  //   let res = {};
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns(res);
  //   await userController.getMUser(req, res);
  //   expect(findUserByPropertyStub).calledOnce;
  //   expect(res.status).to.have.been.calledWith(400);
  //   expect(res.json).to.be.calledWith({ message: "random error" });
  // });
});
