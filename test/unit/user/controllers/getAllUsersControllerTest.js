const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const userController = require("../../../../controllers/user.controller");
const userService = require("../../../../services/user");
const roleService = require("../../../../services/role");

chai.use(sinonChai);
describe("controller Get All User  test ", () => {
  let getAllUserStub;
  let getRolesStub;
  beforeEach(() => {
    getAllUserStub = sinon.stub(userService, "allUser");
    getRolesStub = sinon.stub(roleService, "getRolesForUsers");
  });
  afterEach(() => {
    getAllUserStub.restore();
    getRolesStub.restore();
  });

  it('return a list of users - searching by name or email', async () => {
    getAllUserStub.returns(fixture.users);
    getRolesStub.returns(fixture.roles);
    const req = {
      params: {},
      query: { page: 2, size: 2, searchValue: '@gmail.com' }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.allUser(req, res);
    expect(getAllUserStub).calledOnce;
    expect(getRolesStub).calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith(fixture.result);
  });

  it('return a list of users - searching by Role', async () => {
    getAllUserStub.returns(fixture.users2);
    getRolesStub.returns(fixture.roles);
    const req = {
      params: {},
      query: { page: 2, size: 2, searchValue: 'Admin' }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.allUser(req, res);
    expect(getAllUserStub).calledOnce;
    expect(getRolesStub).calledTwice;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith(fixture.result2);
  });

  it("return an Error in getAllService ", async () => {
    getAllUserStub.returns({
      err: { message: "error" },
      status: "error",
      data: { docs: [] },
    });
    getRolesStub.returns(fixture.role);
    let req = {
      params: {},
      query: { page: 2, size: 2 },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await userController.allUser(req, res);
    expect(getAllUserStub).calledOnce;
    expect(getRolesStub).calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "error",
    });
  });
});
