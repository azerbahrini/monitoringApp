const sinon = require("sinon");
const expect = require("chai").expect;
var chai = require("chai");

chai.use(require("sinon-chai"));
const fixture = require("./fixture.json");
const shiftController = require("../../../../controllers/shift.controller");
const shiftService = require("../../../../services/shift");
const roleService = require("../../../../services/role");

describe("controller get all test ", () => {
  it("expect to send all Shifts", async () => {
    const stubGetRole = sinon.stub(roleService, "getRoleByLabelService").returns(fixture.gsRole);    
    const stubGetAll = sinon.stub(shiftService, "getAllShiftsService").returns({
      data: fixture.all.success.body.data,
      status: "success",
    });
    let req = { body: {}, params: {}, query: { startDate: "2021-09-24", endDate: "2021-09-24" } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await shiftController.getAllShifts(req, res);
    expect(stubGetRole).to.be.calledOnce;
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith(fixture.returnSuccess);
    stubGetAll.restore();
    stubGetRole.restore();
  });
 
});
