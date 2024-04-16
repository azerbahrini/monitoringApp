const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("./fixture.json");
const shiftController = require("../../../../controllers/shift.controller");
const roleService = require("../../../../services/role");
const shiftService = require("../../../../services/shift");

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe("controller Assign A TL ", () => {
  let stubAdd;
  let stubGetShifts;
  let stubRole;
  let stubDelete;
  beforeEach(() => {
    stubAdd = sinon.stub(shiftService, "assigneTl");
    stubGetShifts = sinon.stub(shiftService, "getShiftsForTl");
    stubRole = sinon.stub(roleService, "getRoleByLabelService");
    stubDelete = sinon.stub(shiftService, "deleteMany");
  });
  afterEach(() => {
    stubAdd.restore();
    stubRole.restore();
    stubGetShifts.restore();
    stubDelete.restore();
  });
  it("send a correct shift object ", async () => {
    stubAdd.returns({
      data: fixture.add.success.body.data,
      status: "success",
    });
    stubGetShifts.returns({
      data: fixture.shiftsForTL,
      status: "success",
    });
    stubRole.returns(fixture.role);
    stubDelete.returns({
      data: fixture.add.success.body.data,
      status: "success",
    });
    let req = {
      body: fixture.shiftTlBody,
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await shiftController.assignTeamLeader(req, res);
    expect(stubGetShifts).to.be.calledOnce;
    expect(stubGetShifts).to.be.calledWith(fixture.shiftTlFormatted);
    expect(stubRole).to.be.calledOnce;
    expect(stubRole).to.be.calledWith("Team Leader");
    expect(stubAdd).to.be.calledOnce;
    expect(stubAdd).to.be.calledWith(fixture.addedData);
    expect(stubDelete).to.be.calledOnce;
    expect(stubDelete).to.be.calledWith({ _id: { '$in':fixture.deletedData}});
    expect(res).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res.status).to.have.been.calledWith(200);
    expect(res).to.have.property("json");
    expect(res.json).be.calledWith({
      message: 'Team Leader assigned successfully',
    });
  });
});
