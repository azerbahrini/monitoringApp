const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
chai.use(require("sinon-chai"));
const fixture = require("./fixture.json");
const getAllShiftsService = require("../../../../services/shift/getAll");
const Shift = require("../../../../models/Shift");

chai.use(sinonChai);

describe("testing get all shifts service", () => {
let sandbox;
let aggregateStub;
let populateStub;

  beforeEach(()=> {
     sandbox = sinon.createSandbox();
     aggregateStub = sandbox
      .stub(Shift, "aggregate");
    
     populateStub = sandbox
      .stub(Shift, "populate");
     
  });

  afterEach(()=> {
    sandbox.restore();
    aggregateStub.restore();
    populateStub.restore();
  });


  it("expect to return an success object with user and shift inputs", async () => {
    const teamLeaderId = "6089dae6c5a2a01396729374";
    const startDateParam = "2018-09-24";
    const endDateParam = "2021-10-31";
    const timeZone = "Africa/Tunis";
    const shift= "Day shift";
    const user="60a319f2b3f8622968674f3d";
    aggregateStub.returns(fixture.shiftDocs);
    populateStub.returns(fixture.shiftDocsPopulated);

    const res = await getAllShiftsService(teamLeaderId,startDateParam, endDateParam,timeZone,shift,user);
    expect(aggregateStub).to.have.been.calledOnce;
    expect(populateStub).to.have.been.calledOnce;

    expect(populateStub).to.be.calledWith(fixture.shiftDocs, {
      path: "members",
      model: "user",
      select: ["firstName", "lastName"],
      match: { status: true },
    });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("expect to return an success object without user and shift inputs", async () => {
    const teamLeaderId = "6089dae6c5a2a01396729374";
    const startDateParam = "2018-09-24";
    const endDateParam = "2021-10-31";
    const timeZone = "Africa/Tunis";

    aggregateStub.returns(fixture.shiftDocs);
    populateStub.returns(fixture.shiftDocsPopulated);

    const res = await getAllShiftsService(teamLeaderId,startDateParam, endDateParam,timeZone);
    expect(aggregateStub).to.have.been.calledOnce;
    expect(populateStub).to.have.been.calledOnce;

    expect(populateStub).to.be.calledWith(fixture.shiftDocs, {
      path: "members",
      model: "user",
      select: ["firstName", "lastName"],
      match: { status: true },
    });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("expect to return an error (timeZone fail)", async () => {
    const teamLeaderId = "6089dae6c5a2a01396729374";
    const startDateParam = "2018-09-24";
    const endDateParam = "2021-10-31";
    const timeZone = "Nabeul";    
    const res = await getAllShiftsService(teamLeaderId,startDateParam, endDateParam,timeZone);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("error");
    expect(res.err).to.be.a("error");
  });
});
