const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("./fixture.json");
const taskController = require("../../../../controllers/task.controller");
const taskService = require("../../../../services/task");

describe("controller Start Task test ", () => {
  let stubFind;
  let stubUpdate;
  beforeEach(() => {
    stubFind = sinon.stub(taskService, "getTaskByIdService");
    stubUpdate = sinon.stub(taskService, "updateTasks");
  });
  afterEach(() => {
    stubFind.restore();
    stubUpdate.restore();
  });

  it("expect to return success ", async () => {
    stubFind.returns({
      data: {
        _id: "609061c32b41292a7a2c867f",
        type: "Monitoring",
        globalStatus: "Good",
        state: "In progress",
        request: "Pending",
        resultat: [],
        title: "SM51",
        description: "SAP Transaction",
        map: "60905c242b412971d52c866c",
        user: "6089dae7c5a2a04910729391",
        system: "608beed8c5a2a0c3017294b9",
        estimatedStart: "2021-05-04T00:30:00.000Z",
        __v: 0,
        createdAt: "2021-05-03T20:49:07.366Z",
        updatedAt: "2021-11-03T12:42:42.294Z",
      },
      status: "success",
    });
    stubUpdate.returns(fixture.doneTask);
    let req = {
      body: {},
      params: { id: fixture.foundTask.data._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.finishTask(req, res);
    expect(stubFind).to.be.calledOnce;
    expect(stubUpdate).to.be.calledOnce;
    expect(stubFind).to.be.calledWith(fixture.foundTask.data._id);
    expect(stubUpdate).to.be.calledWith("609061c32b41292a7a2c867f");
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.doneTask.data,
      message: "Successfully Finished the task",
    });
  });

  it("expect to return success  + route + method + ip", async () => {
    stubFind.returns({
      data: {
        _id: "609061c32b41292a7a2c867f",
        type: "Monitoring",
        globalStatus: "Good",
        state: "In progress",
        request: "Pending",
        resultat: [],
        title: "SM51",
        description: "SAP Transaction",
        map: "60905c242b412971d52c866c",
        user: "6089dae7c5a2a04910729391",
        system: "608beed8c5a2a0c3017294b9",
        estimatedStart: "2021-05-04T00:30:00.000Z",
        __v: 0,
        createdAt: "2021-05-03T20:49:07.366Z",
        updatedAt: "2021-11-03T12:42:42.294Z",
      },
      status: "success",
    });
    stubUpdate.returns(fixture.updatedTask);
    let req = {
      body: {},
      params: { id: fixture.foundTask.data._id },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.finishTask(req, res);
    expect(stubFind).to.be.calledOnce;
    expect(stubUpdate).to.be.calledOnce;
    expect(stubFind).to.be.calledWith(fixture.foundTask.data._id);
    expect(stubUpdate).to.be.calledWith("609061c32b41292a7a2c867f");
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.updatedTask.data,
      message: "Successfully Finished the task",
    });
  });

  it("expect to return 404 error  - no Task can be found ", async () => {
    stubFind.returns(fixture.notaskFound);
    let req = {
      body: {},
      params: { id: fixture.foundTask.data._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.finishTask(req, res);
    expect(stubFind).to.be.calledOnce;
    expect(stubFind).to.be.calledWith(fixture.foundTask.data._id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "No task can be found with this ID.",
    });
  });

  it("expect to return 400 error  - cannot change task state ", async () => {
    stubFind.returns(fixture.doneTask);
    let req = {
      body: {},
      params: { id: fixture.doneTask.data._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.finishTask(req, res);
    expect(stubFind).to.be.calledOnce;
    expect(stubFind).to.be.calledWith(fixture.foundTask.data._id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: `Cannot change the Task State from ${fixture.doneTask.data.state} to Done.`,
    });
  });

  it("expect to fail to update the task.", async () => {
    stubFind.returns({
      data: {
        _id: "609061c32b41292a7a2c867f",
        type: "Monitoring",
        globalStatus: "Good",
        state: "In progress",
        request: "Pending",
        resultat: [],
        title: "SM51",
        description: "SAP Transaction",
        map: "60905c242b412971d52c866c",
        user: "6089dae7c5a2a04910729391",
        system: "608beed8c5a2a0c3017294b9",
        estimatedStart: "2021-05-04T00:30:00.000Z",
        __v: 0,
        createdAt: "2021-05-03T20:49:07.366Z",
        updatedAt: "2021-11-03T12:42:42.294Z",
      },
      status: "success",
    });
    stubUpdate.returns({
      status: "error",
      err: { message: "failed to update the task" },
    });

    let req = {
      body: {},
      params: { id: "609061c32b41292a7a2c867f" },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.finishTask(req, res);
    expect(stubFind).to.be.calledOnce;
    expect(stubFind).to.be.calledWith("609061c32b41292a7a2c867f");
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: "failed to update the task" });
  });

  it("expect to fail to update the task.  + route + method + ip", async () => {
    stubFind.returns({
      data: {
        _id: "609061c32b41292a7a2c867f",
        type: "Monitoring",
        globalStatus: "Good",
        state: "In progress",
        request: "Pending",
        resultat: [],
        title: "SM51",
        description: "SAP Transaction",
        map: "60905c242b412971d52c866c",
        user: "6089dae7c5a2a04910729391",
        system: "608beed8c5a2a0c3017294b9",
        estimatedStart: "2021-05-04T00:30:00.000Z",
        __v: 0,
        createdAt: "2021-05-03T20:49:07.366Z",
        updatedAt: "2021-11-03T12:42:42.294Z",
      },
      status: "success",
    });
    stubUpdate.returns({
      status: "error",
      err: { message: "failed to update the task" },
    });

    let req = {
      body: {},
      params: { id: "609061c32b41292a7a2c867f" },
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.finishTask(req, res);
    expect(stubFind).to.be.calledOnce;
    expect(stubFind).to.be.calledWith("609061c32b41292a7a2c867f");
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: "failed to update the task" });
  });
});
