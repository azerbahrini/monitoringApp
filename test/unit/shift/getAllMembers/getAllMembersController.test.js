const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("./fixture.json");
const shiftController = require("../../../../controllers/shift.controller");
const shiftService = require("../../../../services/shift");
const roleService = require("../../../../services/role");

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe("controller get all test ", () => {
  const sandbox = sinon.createSandbox();

  it("expect to send all Shift Members", async () => {
    const stubGetAll = sandbox
      .stub(shiftService, "getAllMembers")
      .returns(fixture.serviceResponce);
    const stubGetRole = sandbox
      .stub(roleService, "getRoleByLabelService")
      .returns(fixture.teamLeaderRoles);

    let req = {
      body: {},
      params: {},
      query: {
        shift: "intermediate shift",
        startDate: "2018-01-10",
        endDate: "2021-10-10",
        paginate: "false",
      },
    };
    let res = {};
    res.status = sandbox.stub().returns(res);
    res.json = sandbox.stub().returns(res);

    await shiftController.getAllMembers(req, res);

    expect(stubGetRole).to.be.calledOnce;
    expect(stubGetRole).be.calledWith("Team Leader");

    expect(stubGetAll).to.be.calledOnce;
    expect(stubGetAll).be.calledWith(
      "5fa02d8f785e4681ddfa3a6e",
      "intermediate shift",
      "2018-01-10",
      "2021-10-10"
    );
    expect(res.status).to.have.been.calledWith(200);
    expect(res).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res).to.have.property("json");
    expect(res.json).to.be.a("function");
    stubGetRole.restore();
  });
});
