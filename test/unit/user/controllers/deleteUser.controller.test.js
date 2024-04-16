const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const userController = require("../../../../controllers/user.controller");
const userService = require("../../../../services/user");

chai.use(sinonChai);
describe("controller Delete User  test ", () => {
  let deleteUserByIdStub;

  beforeEach(() => {
    deleteUserByIdStub = sinon.stub(userService, "deleteUserById");
  });
  afterEach(() => {
    deleteUserByIdStub.restore();
  });

  it("delete and return deleted User ", async () => {
    deleteUserByIdStub.returns({
      data: fixture.returnedUser,
      status: "success",
    });
    let req = {
      body: {},
      params: { id: fixture.returnedUser._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.deleteUser(req, res);
    expect(deleteUserByIdStub).calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.returnedUser,
    });
  });
  it("return an error object - User not found ", async () => {
    deleteUserByIdStub.returns({
      err: { message: "user not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: {},
      params: { id: fixture.returnedUser._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.deleteUser(req, res);
    expect(deleteUserByIdStub).calledOnce;
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "user not found",
    });
  });
});
