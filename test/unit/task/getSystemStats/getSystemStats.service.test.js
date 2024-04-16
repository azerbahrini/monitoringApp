const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const systemService = require("../../../../services/system");
const TaskStatisticsHistoryService = require("../../../../services/TaskStatisticsHistory");
const mapService = require("../../../../services/map");

const fixture = require("./fixture.json");
const getSystemStatsService = require("../../../../services/task/getSystemStatsService");
const Task = require("../../../../models/Task");
const System = require("../../../../models/System");
const moment = require('moment');

chai.use(sinonChai);

describe("get System Stats service", () => {
  const sandbox = sinon.createSandbox();
  let getSystemsStub;
  let getMapsStub;
  let aggregateStub;
  let findStub;
  let saveStub;
  beforeEach("", () => {
    getSystemsStub = sandbox.stub(systemService, "getSystemsForMapsService");
    getMapsStub = sandbox.stub(mapService, "getMapsBySystems");
    aggregateStub = sandbox.stub(Task, "aggregate");
    findStub = sandbox.stub(System, "findById");
    saveStub = sandbox.stub(TaskStatisticsHistoryService, "saveTaskStats");
  });

  afterEach(() => {
    getSystemsStub.restore();
    getMapsStub.restore();
    aggregateStub.restore();
    findStub.restore();
    saveStub.restore();
  });

  it("Expect to return an success object - without filter", async () => {
    getSystemsStub.returns(fixture.systems);
    getMapsStub.returns({
      data: fixture.maps,
      status: "success",
    });
    aggregateStub.returns(fixture.dbTasks);
    findStub.returns(fixture.foundsystem);
    saveStub.returns(fixture.savedData);
    const startDate = moment().utc().startOf('day').add('20', 'minutes').format();
    const endDate = moment().utc().startOf('day').add('10', 'hours').format();
    const timeZone = "Africa/Tunis";
    const userId = "61796b44032f034827db8a02";

    const res = await getSystemStatsService(
      startDate,
      endDate,
      timeZone,
      userId
    );
    expect(getSystemsStub).to.have.been.calledOnce;
    expect(getMapsStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.data[0]).to.be.a("object");
    expect(res.data[0]).to.have.property("systemName");
    expect(res.data[0]).to.have.property("targetTasks");
    expect(res.data[0]).to.have.property("createdTasks");
    expect(res.data[0].systemName).to.be.a("string");
    expect(res.data[0].targetTasks).to.be.a("number");
    expect(res.data[0].createdTasks).to.be.a("number");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an success object - with filter", async () => {
    getSystemsStub.returns(fixture.systems);
    getMapsStub.returns({
      data: fixture.maps,
      status: "success",
    });
    aggregateStub.returns(fixture.dbTasks);
    findStub.returns(fixture.foundsystem);
    saveStub.returns(fixture.savedData);
    const startDate = moment().utc().startOf('day').add('20', 'minutes').format();
    const endDate = moment().utc().startOf('day').add('10', 'hours').format();
    const timeZone = "Africa/Tunis";
    const userId = "61796b44032f034827db8a02";
    const customerIDFilter = "608bde23c5a2a0a1607294a5";
    const res = await getSystemStatsService(
      startDate,
      endDate,
      timeZone,
      userId,
      customerIDFilter
    );
    expect(getSystemsStub).to.have.been.calledOnce;
    expect(getMapsStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.data[0]).to.be.a("object");
    expect(res.data[0]).to.have.property("systemName");
    expect(res.data[0]).to.have.property("targetTasks");
    expect(res.data[0]).to.have.property("createdTasks");
    expect(res.data[0].systemName).to.be.a("string");
    expect(res.data[0].targetTasks).to.be.a("number");
    expect(res.data[0].createdTasks).to.be.a("number");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an error", async () => {
    getSystemsStub.returns(fixture.systems);
    getMapsStub.returns({
      data: [],
      status: "success",
    });
    aggregateStub.returns([]);
    findStub.returns(fixture.foundsystem);
    const startDate = moment().utc().startOf('day').add('20', 'minutes').format();
    const endDate = moment().utc().startOf('day').add('10', 'hours').format();
    const timeZone = "Africa/Tunis";
    const userId = "61796b44032f034827db8a02";

    const res = await getSystemStatsService(
      startDate,
      endDate,
      timeZone,
      userId
    );
    expect(getSystemsStub).to.have.been.calledOnce;
    expect(getMapsStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res).to.have.property("code");
    expect(res.err).to.be.a("object");
    expect(res.err).to.have.property("message");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq("No data can be found.");
    expect(res.status).to.be.a("string");
    expect(res.status).to.be.eq("error");
    expect(res.code).to.be.eq(404);
  });

  it("Expect to  fail to save the data", async () => {
    getSystemsStub.returns(fixture.systems);
    getMapsStub.returns({
      data: fixture.maps,
      status: "success",
    });
    aggregateStub.returns([]);
    findStub.returns(fixture.foundsystem);
    saveStub.returns({
      status: "error",
      code: 400,
      err: {
        message: "Failed to save the data",
      },
    });
    const startDate = moment().utc().startOf('day').add('20', 'minutes').format();
    const endDate = moment().utc().startOf('day').add('10', 'hours').format();
    const timeZone = "Africa/Tunis";
    const userId = "61796b44032f034827db8a02";

    const res = await getSystemStatsService(
      startDate,
      endDate,
      timeZone,
      userId
    );
    expect(getSystemsStub).to.have.been.calledOnce;
    expect(getMapsStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res).to.have.property("code");
    expect(res.err).to.be.a("object");
    expect(res.err).to.have.property("message");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq("Failed to save the data");
    expect(res.status).to.be.a("string");
    expect(res.status).to.be.eq("error");
    expect(res.code).to.be.eq(400);
  });
    it("Expect to throw an error", async () => {
      getSystemsStub.throws(new Error("random error"));
      const startDate = moment().utc().startOf('day').add('20', 'minutes').format();
      const endDate = moment().utc().startOf('day').add('10', 'hours').format();
      const timeZone = "Africa/Tunis";
      const userId = "61796b44032f034827db8a02";

      const res = await getSystemStatsService(
        startDate,
        endDate,
        timeZone,
        userId
      );
      expect(res).to.be.a("object");
      expect(res).to.have.property("err");
      expect(res).to.have.property("status");
      expect(res.err).to.be.a("error");
      expect(res.status).to.be.eq("error");
    });

    sandbox.restore();
});
