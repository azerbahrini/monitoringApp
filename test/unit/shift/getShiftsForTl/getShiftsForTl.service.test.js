const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
chai.use(require("sinon-chai"));
const fixture = require("./fixture.json");
const getShiftsForTlService = require("../../../../services/shift/getShiftsForTl");
const Shift = require("../../../../models/Shift");

chai.use(sinonChai);

describe("testing get all shifts service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;

  beforeEach(() => {
    findStub = sandbox.stub(Shift, "find");
  });
  afterEach(() => {
    findStub.restore();
  });

  it("expect to return an success object", async () => {
    const user = "5fa02d8f785e4681ddfa3a6e";
    const name = "Testing Name";
    const startDateParam = "2018-09-24";
    const endDateParam = "2021-09-24";
    findStub.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.shiftsForTL,
      }),
    });
    const res = await getShiftsForTlService([
      {
        user,
        name,
        startDateParam,
        endDateParam,
      },
    ]);
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith({
      $or: [
        {
          user,
          name,
          startDateParam,
          endDateParam,
        },
      ],
    });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return a 404 error , Shift Not Found", async () => {
    const user = "invalid user id";
    const name = "Testing Name";
    const startDateParam = "2018-09-24";
    const endDateParam = "2021-09-24";

    findStub.returns({
      lean: sandbox.stub().returns({
        exec: () => [],
      }),
    });
    const res = await getShiftsForTlService([
      {
        user,
        name,
        startDateParam,
        endDateParam,
      },
    ]);
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith({
      $or: [
        {
          user: "invalid user id",
          name: "Testing Name",
          startDateParam: "2018-09-24",
          endDateParam: "2021-09-24",
        },
      ],
    });
    expect(res).to.be.a("object");
    expect(res.err).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res).to.have.property("statusCode");
    expect(res.err).to.have.property("message");
    expect(res.err.message).to.be.eq("Shift not found");
    expect(res.status).to.be.eq("error");
    expect(res.statusCode).to.be.eq(404);
  });

  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getShiftsForTlService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
