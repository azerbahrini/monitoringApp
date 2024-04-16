// const sinon = require("sinon");
// const expect = require("chai").expect;
// const chai = require("chai");
// const sinonChai = require("sinon-chai");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const fixture = require("../fixture.json");
// const userController = require("../../../../controllers/user.controller");
// const userService = require("../../../../services/user");

// chai.use(sinonChai);
// describe("controller Login User  test ", () => {
//   let findUserByPropertyStub;
//   let compareBcryptStub;
//   let signTokenStub;
//   beforeEach(() => {
//     signTokenStub = sinon.stub(jwt, "sign");
//     compareBcryptStub = sinon.stub(bcrypt, "compare");
//     findUserByPropertyStub = sinon.stub(userService, "findUserByProperty");
//   });
//   afterEach(() => {
//     findUserByPropertyStub.restore();
//     compareBcryptStub.restore();
//     signTokenStub.restore();
//   });

//   it("send a correct user object ", async () => {
//     findUserByPropertyStub.returns({
//       data: fixture.returnedUser,
//       status: "success",
//     });
//     compareBcryptStub.returns(true);
//     signTokenStub.returns(fixture.token);
//     let req = {
//       body: { ...fixture.userToLogin },
//       params: {},
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await userController.login(req, res);
//     expect(findUserByPropertyStub).calledOnce;
//     expect(res.status).to.have.been.calledWith(200);
//     expect(res.json).be.calledWith({
//       data: { token: fixture.token },
//     });
//   });
//   it("send a correct user object - Email is not Active ", async () => {
//     findUserByPropertyStub.returns({
//       data: fixture.returnedUserWithAccountIsNotActive,
//       status: "success",
//     });
//     compareBcryptStub.returns(true);
//     signTokenStub.returns(fixture.token);
//     let req = {
//       body: { ...fixture.userToLogin },
//       params: {},
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await userController.login(req, res);
//     expect(findUserByPropertyStub).calledOnce;
//     expect(res.status).to.have.been.calledWith(401);
//     expect(res.json).be.calledWith({ message: "The account is not active" });
//   });
//   it("send wrong user object - wrong email  ", async () => {
//     findUserByPropertyStub.returns({
//       err: { message: "Incorrect Confidential" },
//       status: "error",
//     });
//     let req = {
//       body: { ...fixture.userToLogin },
//       params: {},
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await userController.login(req, res);
//     expect(findUserByPropertyStub).calledOnce;
//   });

//   it("send wrong user object - wrong password  ", async () => {
//     findUserByPropertyStub.returns({
//       data: fixture.returnedUser,
//       status: "success",
//     });
//     compareBcryptStub.returns(false);
//     let req = {
//       body: { ...fixture.userToLogin },
//       params: {},
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await userController.login(req, res);
//     expect(findUserByPropertyStub).calledOnce;
//     expect(compareBcryptStub).calledOnce;
//   });
//   it("Internal Error ", async () => {
//     findUserByPropertyStub.throws(new Error("random error"));
//     let req = {
//       body: { ...fixture.userToLogin },
//       params: {},
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await userController.login(req, res);
//     expect(findUserByPropertyStub).calledOnce;
//     expect(res.status).to.have.been.calledWith(400);
//     expect(res.json).be.calledWith({ message: "Server error" });
//   });
// });
