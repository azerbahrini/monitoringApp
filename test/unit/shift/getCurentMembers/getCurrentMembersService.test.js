const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
chai.use(require("sinon-chai"));
const fixture = require("./fixture.json");
const getCurrentMembersShiftsService = require("../../../../services/shift/getCurrentMembers");
const Shift = require("../../../../models/Shift");
const roleService = require("../../../../services/role");

chai.use(sinonChai);

describe("testing get current shifts service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;

  beforeEach(() => {
    findStub = sandbox.stub(Shift, "find");
  });

  afterEach(() => {
    
    findStub.restore();
  });

  it("expect to return an success", async () => {
    findStub.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => fixture.currentShifts,
        }),
      }),
    });
    const res = await getCurrentMembersShiftsService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("expect to return an error - no shifts can be found", async () => {
    
    findStub.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => [],
        }),
      }),
    });
    const res = await getCurrentMembersShiftsService();
    
    expect(findStub).to.have.been.calledOnce;
    
    expect(res).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res).to.have.property("err");
    expect(res.err).to.be.a("object");
    expect(res.err).to.have.property("message");
    expect(res.err.message).to.be.eq("No shifts can be found.");
    expect(res.status).to.be.eq("error");
  });

  it("Expect to throw an error", async () => {
    findStub.throws(new Error("random error"));
    const res = await getCurrentMembersShiftsService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

});
