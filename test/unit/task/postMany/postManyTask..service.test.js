const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const addTaskService = require("../../../../services/task/addManyTask.service");
const Task = require("../../../../models/Task");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe(" POST Many Task service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(Task, "insertMany");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("Expect to return an success object", async () => {
    createStub.returns([fixture.taskDataTestWithoutID]);

    const res = await addTaskService([fixture.taskDataTestWithoutID]);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith([fixture.taskDataTestWithoutID]);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return a success object - adding random property ", async () => {
    createStub.returns([fixture.wrongTaskDataTest]);

    const res = await addTaskService([fixture.wrongTaskDataTest]);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith([fixture.wrongTaskDataTest]);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to return an error object - empty object", async () => {
    createStub.throws(new Error(mongooseError("task", ["title", "description","user"])));
    const res = await addTaskService([fixture.emptyTaskDataTest]);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith([fixture.emptyTaskDataTest]);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("task", ["title", "description","user"]));
    expect(res.status).to.be.eq("error");
  });
  it("Expect to return an error object - missing property", async () => {
    const taskObject = { title: fixture.taskDataTest.title };
    createStub.throws(new Error(mongooseError("task", ["description","user"])));
    const res = await addTaskService([taskObject]);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith([taskObject]);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("task", ["description","user"]));
    expect(res.status).to.be.eq("error");
  });
});
