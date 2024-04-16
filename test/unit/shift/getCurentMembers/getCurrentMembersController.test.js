const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("./fixture.json");
const shiftController = require("../../../../controllers/shift.controller");
const getCurrentMembersShiftsService = require("../../../../services/shift/");
const shiftService = require('../../../../services/shift');
const roleService = require("../../../../services/role");

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe("controller get all test ", () => {
  const sandbox = sinon.createSandbox();

  let stubGetCurrentMembers;
  let getShiftByUserIdStub;

  beforeEach(() => {
    stubGetCurrentMembers = sandbox.stub(shiftService, "getCurrentMembers");
    getShiftByUserIdStub  = sandbox.stub(shiftService, "getShiftByUserIDService")
  });

  afterEach(() => {
    stubGetCurrentMembers.restore();
    getShiftByUserIdStub.restore();
  });

  it("expect to send Current Shift Members", async () => {
    stubGetCurrentMembers.returns({
      data: fixture.currentShifts,
      status: "success",
    });
    getShiftByUserIdStub.returns({
      data: fixture.currentMembers,
      status: "success"
    })

    const req = {
      body: {},
      params: {},
      query: { id: "61b86c21da763a5e8724e3f7"}
    };
    const res = {};
    res.status = sandbox.stub().returns(res);
    res.json = sandbox.stub().returns(res);
    await shiftController.getCurrentMembers(req, res);

    expect(stubGetCurrentMembers).to.be.calledOnce;
    expect(getShiftByUserIdStub).to.be.calledOnce;
    expect(getShiftByUserIdStub).to.be.calledWith(req.query.id)
    expect(res.status).to.have.been.calledWith(200);
    expect(res).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res).to.have.property("json");
  });

  it("expect to return a 404 error", async () => {
    stubGetCurrentMembers.returns({
      err: { message: "error" },
      status: "error"
    });
    getShiftByUserIdStub.returns({
      data: fixture.currentMembers,
      status: "success"
    })

    let req = {
      body: {},
      params: {},
      query: {id: "61b86c21da763a5e8724e3f7"}
    };
    let res = {};
    res.status = sandbox.stub().returns(res);
    res.json = sandbox.stub().returns(res);
    await shiftController.getCurrentMembers(req, res);
    expect(stubGetCurrentMembers).to.be.calledOnce;
    expect(getShiftByUserIdStub).to.be.calledOnce;
    expect(getShiftByUserIdStub).to.be.calledWith(req.query.id)
    expect(res.status).to.have.been.calledWith(400);
    expect(res).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res).to.have.property("json");
  });
});
