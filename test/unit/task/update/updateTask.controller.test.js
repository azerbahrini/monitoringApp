const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const taskController = require("../../../../controllers/task.controller");
const taskService = require("../../../../services/task");

describe("controller UPDATE Task test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(taskService, "updateTasks");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new task ", async () => {
    stubUpdate.returns({
      data: fixture.taskDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.taskDataTest },
      params: { id: fixture.taskDataTest._id },
      
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.updateTask(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.taskDataTest,
    });
  });


  it("expect to return new task route+post+ip", async () => {
    stubUpdate.returns({
      data: fixture.taskDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.taskDataTest },
      params: { id: fixture.taskDataTest._id },
      route: "/testing", method: 'post', ip: '1234' ,
      
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.updateTask(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.taskDataTest,
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "task not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.taskDataTest },
      params: { id: fixture.wrongID },
      
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.updateTask(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "task not found",
    });
  });

  it("expect to return an error - ID Does not exist route+post+ip", async () => {
    stubUpdate.returns({
      err: { message: "task not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.taskDataTest },
      params: { id: fixture.wrongID },
      route: "/testing", method: 'post', ip: '1234' ,
      
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.updateTask(req, res);
    expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "task not found",
    });
  });
});
