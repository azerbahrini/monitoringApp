const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
const moment = require("moment");

const fixture = require("./fixture.json");
const getAllMembersService = require("../../../../services/shift/getAllMembers");

const Shift = require("../../../../models/Shift");

chai.use(sinonChai);

describe("testing get all shifts service", () => {
  let findStub;
  const sandbox = sinon.createSandbox();
  beforeEach("", () => {
    findStub = sandbox.stub(Shift, "find");
  });
  afterEach(() => {
    findStub.restore();
  });

  it("expect to return an success", async () => {
    const startDateParam = "2018-01-10";
    const endDateParam = "2021-10-10";
    const start = new Date(moment("2018-01-10"));
    const end = new Date(moment("2021-10-10"));
    const shiftParam = "intermediate shift";
    const teamLeaderIDParam = "609ef2e4a5ae627c39229d03";

    findStub
      .onFirstCall()
      .returns({
        populate: sandbox.stub().returns({
          lean: sandbox.stub().returns({
            exec: () => fixture.usersAvailable,
          }),
        }),
      })
      .onSecondCall()
      .returns({
        lean: sandbox.stub().returns({
          exec: () => fixture.shiftHistory,
        }),
      });

    const aggregateStub = sandbox
      .stub(Shift, "aggregate")
      .returns(fixture.tlDocs);

    const populateStub = sandbox
      .stub(Shift, "populate")
      .returns(fixture.tlDocsPopulated);

    const res = await getAllMembersService(
      teamLeaderIDParam,
      shiftParam,
      startDateParam,
      endDateParam
    );
    expect(findStub).to.have.been.calledTwice;
    expect(aggregateStub).to.have.been.calledOnce;
    expect(populateStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith(
      { startDate: { $gt: start, $lt: end }, name: shiftParam },
      { user: 1 }
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("expect to return an error (missing params data)", async () => {
    //sending without  params
    const res = await getAllMembersService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("error");
    expect(res.err).to.be.a("error");
  });

  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getAllMembersService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
