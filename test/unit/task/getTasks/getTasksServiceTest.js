const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
chai.use(require("sinon-chai"));
const fixture = require("../fixture.json");
const getTasksService = require("../../../../services/task/getTasks");
const Task = require("../../../../models/Task");
var moment = require("moment-timezone");

chai.use(sinonChai);

describe("testing get all Tasks Filtred service", () => {
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
  it("expect to return an success object", async () => {
    let searchValue = "SP01 PR1";
    let type = "Monitoring";
    let state = ["Done", "Pending"];
    let startDate = moment("2021-11-20T17:00:00+08:00").format();
    let endDate = moment("2021-11-20T17:00:00+08:00").format();
    let timeZone = "Asia/Taipei";

    aggregateStub.returns(fixture.arrayOfFiltredTasks);
    const res = await getTasksService(
      searchValue,
      JSON.stringify(["Monitoring"]),
      JSON.stringify(["Done", "Pending"]),
      startDate,
      endDate,
      timeZone
    );
    expect(aggregateStub).to.have.been.calledOnce;

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("expect to return No Data ", async () => {
    let searchValue = "SP01 PR1";
    let type = "Monitoring";
    let state = ["Done", "Pending"];
    let startDate = moment("2020-11-20T17:00:00+08:00").format();
    let endDate = moment("2020-11-20T17:00:00+08:00").format();
    let timeZone = "Asia/Taipei";
    aggregateStub.returns([]);
    const res = await getTasksService(
      searchValue,
      JSON.stringify(["Monitoring"]),
      JSON.stringify(["Done", "Pending"]),
      startDate,
      endDate,
      timeZone
    );
 
    expect(res).to.be.a("object");
    expect(res).to.have.property("error");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("no data");
  });
  it("Expect to throw an exception", async () => {
    let searchValue = "SP01 PR1";
    let type = ["Monitoring"];
    let state = ["Done", "Pending"];
    let startDate = moment("2020-11-20T17:00:00+08:00").format();
    let endDate = moment("2020-11-20T17:00:00+08:00").format();
    let timeZone = "Asia/Taipei";
    aggregateStub.throws(new Error("Random error"));
      const res = await getTasksService( searchValue,
        JSON.stringify(["Monitoring"]),
        JSON.stringify(["Done", "Pending"]),
        startDate,
        endDate,
        timeZone);
      expect(aggregateStub).to.have.been.calledOnce;
      expect(res).to.be.a("object");
      expect(res).to.have.property("err");
      expect(res).to.have.property("status");
      expect(res.err).to.be.a("error");
      expect(res.status).to.be.eq("error");
    });
});
