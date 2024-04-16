const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const fixture = require("../fixture.json");
const userController = require("../../../../controllers/user.controller");
const userService = require("../../../../services/user");
const roleService = require("../../../../services/role");
const shiftService = require("../../../../services/shift");

chai.use(sinonChai);
describe("controller Register User  test ", () => {
  let findUserByPropertyStub;
  let addUserStub;
  let signTokenStub;
  let getRoleStub;
  let createShiftStub;
  beforeEach(() => {
    signTokenStub = sinon.stub(jwt, "sign");
    addUserStub = sinon.stub(userService, "addUser");
    findUserByPropertyStub = sinon.stub(userService, "findUserByProperty");
    getRoleStub = sinon.stub(roleService, "getRoleByLabelService");
    createShiftStub = sinon.stub(shiftService, "addShift");
  });
  afterEach(() => {
    findUserByPropertyStub.restore();
    signTokenStub.restore();
    addUserStub.restore();
    getRoleStub.restore();
    createShiftStub.restore();
  });

  it("send a correct user object ", async () => {
    findUserByPropertyStub.returns({
      err: { message: "user not found" },
      status: "error",
      statusCode: 404,
    });
    signTokenStub.returns(fixture.token);
    getRoleStub.returns({data :{_id:"60f88aeed16e9d5aab468fe6"},status: "success"});
    addUserStub.returns({ data: fixture.returnedUser, status: "success" });
    createShiftStub.returns({datat:{
      role: "60ee0042d9b53b3e084209f5",
      shiftId: null,
      name: "Register Shift",
      updatedShiftAt: "2021-09-24T00:14:17.179+00:00",
      startDate: "2021-09-24T00:14:17.179+00:00",
      endDate: "2021-09-24T00:14:17.179+00:00",
      user: "60ee0042d9b53b3e084209f5",
      type: "app",
      userMicrosoftId: "000",
      reference: null,
    },status: 'success'});
    let req = {
      body: {
        firstName: "Test",
        lastName: "Test2",
        email: "zzzz@avaxia.com",
        password: "123456789",
        phoneNumber: "55555555",
      },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.register(req, res);
    expect(findUserByPropertyStub).calledOnce;
    expect(addUserStub).calledOnce;
    expect(getRoleStub).calledOnce;
    expect(createShiftStub).calledOnce;
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({ message: "Successfully Registered" });
  });
  it("send a correct user object - Email already exists ", async () => {
    findUserByPropertyStub.returns({
      data: fixture.returnedUser,
      status: "success",
    });
    let req = {
      body: { ...fixture.userToRegister },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.register(req, res);
    expect(findUserByPropertyStub).calledOnce;

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: "User already exists" });
  });
  it("send a correct user object - Error Creating User ", async () => {
    findUserByPropertyStub.returns({
      err: { message: "message" },
      status: "error",
    });
    addUserStub.returns({
      err: { message: "error message" },
      status: "error",
    });
    let req = {
      body: { ...fixture.userToRegister },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.register(req, res);
    expect(findUserByPropertyStub).calledOnce;

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: "error message" });
  });
  it("Throw An Internal Error ", async () => {
    findUserByPropertyStub.throws(new Error("random Error"));

    let req = {
      body: { ...fixture.userToRegister },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.register(req, res);
    expect(findUserByPropertyStub).calledOnce;

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: "Server error" });
  });
});
