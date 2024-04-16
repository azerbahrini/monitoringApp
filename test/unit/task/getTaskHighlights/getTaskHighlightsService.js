const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
chai.use(require("sinon-chai"));
const fixture = require("../fixture.json");
const getTaskHighlightsService = require("../../../../services/task/getTaskHighlights");
const Task = require("../../../../models/Task");
var moment = require("moment-timezone");

chai.use(sinonChai);

describe("testing get Task Highlights service", () => {
  let sandbox;
  let aggregateStub;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    aggregateStub = sandbox.stub(Task, "aggregate");
  });

  afterEach(() => {
    sandbox.restore();
    aggregateStub.restore();
  });
  it("expect to return an success object : user highlights", async () => {
    const userId = "61796c869f950f6bc0e40315";
    const startDate = "2021-11-20T17:00:00+08:00";
    const endDate = "2021-11-20T17:00:00+08:00";

    aggregateStub.returns([
      { state: 'Done', count: 2 },
      { state: 'Pending', count: 2 },
      { state: 'To be validated', count: 3 },
      { state: 'Completed', count: 1 },
      { state: 'In progress', count: 3 }
    ]
    );
    const res = await getTaskHighlightsService(
      userId,
      startDate,
      endDate
    );
    expect(aggregateStub).to.have.been.calledOnce;

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("expect to return an success object : shift highlights", async () => {
    const userId = null;
    const startDate ="2021-11-20T17:00:00+08:00";
    const endDate = "2021-11-20T17:00:00+08:00";

    aggregateStub.returns(
      [
        { state: 'Done', count: 2 },
        { state: 'Pending', count: 2 },
        { state: 'To be validated', count: 3 },
        { state: 'Completed', count: 1 },
        { state: 'In progress', count: 3 }
      ]
    );
    const res = await getTaskHighlightsService(
      userId,
      startDate,
      endDate
    );
    expect(aggregateStub).to.have.been.calledOnce;

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to throw an exception", async () => {
    const userId = "61796c869f950f6bc0e40315";
    const startDate = moment("2020-11-20T17:00:00+08:00").format();
    const endDate = moment("2020-11-20T17:00:00+08:00").format();
    aggregateStub.throws(new Error("Random error"));
    const res = await getTaskHighlightsService(
      userId,
      startDate,
      endDate,
    );
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
