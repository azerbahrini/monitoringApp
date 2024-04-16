const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("./fixture.json");
const checkCreatedTasksService = require("../../../../services/task/checkCreatedTasks.service");
const Task = require("../../../../models/Task");
const moment = require('moment');

chai.use(sinonChai);

describe("check Created Tasks service test", () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach("", () => {
    findStub = sandbox.stub(Task, "find");
  });

  it("Expect to return an success object (virtual)", async () => {
    findStub.returns({
      populate: sandbox.stub().returns({
    lean: sandbox.stub().returns({
      exec: () => fixture.outputTasks,
    })
  })
  });

    const userId="2021-11-15T16:30:00.000Z";
    const startDate="2021-11-15T07:00:00.000Z";
    const endDate="2021-11-15T16:30:00.000Z";

    const res = await checkCreatedTasksService(
      fixture.inputTasks,
      userId,
      startDate,
      endDate,
      "Africa/Tunis",
      "virtual"
    );
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith({
      estimatedStart: { $gte: new Date(moment(startDate)), $lt: new Date(moment(endDate))}
    });

    expect(res).to.be.a("object");
   // expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an success object (real)", async () => {
    findStub.returns({
      populate: sandbox.stub().returns({
    lean: sandbox.stub().returns({
      exec: () => fixture.outputTasks,
    })
  })
  });

    const userId="2021-11-15T16:30:00.000Z";
    const startDate="2021-11-15T07:00:00.000Z";
    const endDate="2021-11-15T16:30:00.000Z";

    const res = await checkCreatedTasksService(
      fixture.inputTasks,
      userId,
      startDate,
      endDate,
      "Africa/Tunis",
      "real"
    );
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith({
      estimatedStart: { $gte: new Date(moment(startDate)), $lt: new Date(moment(endDate))},
      assignee: userId,
      state: {$in:["Pending","In progress"]}
    });

    expect(res).to.be.a("object");
    //expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to throw an error", async () => {
    findStub.throws(new Error("random error"));
    const res = await checkCreatedTasksService();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findStub.restore();
  });
  sandbox.restore();
});
