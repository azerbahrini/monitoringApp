const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const userController = require("../../../../controllers/user.controller");
const userService = require("../../../../services/user");
const roleService = require("../../../../services/role");


chai.use(sinonChai);
describe("controller Get One User  test ", () => {
  let findUserByPropertyStub;
  let getAllRoleByUserStub;

  beforeEach(() => {
    findUserByPropertyStub = sinon.stub(userService, "findUserByProperty");
    getAllRoleByUserStub = sinon.stub(roleService, "getAllRoleByUser");
  });
  afterEach(() => {
    findUserByPropertyStub.restore();
    getAllRoleByUserStub.restore();
  });



  it("return a list of users ", async () => {
    findUserByPropertyStub.returns({
      data: fixture.returnedUser,
      status: "success",
      
    });

    getAllRoleByUserStub.returns({
     data: [], status: 'success' 
    });


    let req = {
      body: {},
      params: { id: fixture.returnedUser._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    
    await userController.getOneUser(req, res);
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
      body: {},
      params: { id: fixture.returnedUser._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.getOneUser(req, res);
    expect(findUserByPropertyStub).calledOnce;
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "user not found",
    });
  });
});
