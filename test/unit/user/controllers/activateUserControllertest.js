const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const userController = require("../../../../controllers/user.controller");
const userSerivce = require("../../../../services/user");

describe("controller Activate User test ", () => {
  
  let stubActivate;
  beforeEach(() => {
    stubActivate = sinon.stub(userSerivce, "activateUser");
  });
  afterEach(() => {
    stubActivate.restore();
  });
  it("expect to return a User ", async () => {
    stubActivate.returns({
        data:fixture.returnedUser , 
        status : "success"
    });
    let req = {
      params: { id: fixture.returnedUser._id ,  },
      query : {reqStatus : false}
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.activateUser(req, res);
    expect(stubActivate).to.be.calledWith(req.params.id , req.query.reqStatus);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.returnedUser,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubActivate.returns({
      err: { message: "User not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.returnedUser },
      params: { id: fixture.wrongID },
      query : {reqStatus : false}
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.activateUser(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "User not found",
    });
  });
});
