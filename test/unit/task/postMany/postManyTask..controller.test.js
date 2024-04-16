const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const taskController = require("../../../../controllers/task.controller");
const taskService = require("../../../../services/task");
describe("controller POST Many Task test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(taskService, "addManyTaskService");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct task object ", async () => {
    stubAdd.returns({
      data: [fixture.taskDataTest],
      status: "success",
    });
    let req = {
      body: [{ ...fixture.taskDataTestWithoutID },{ ...fixture.taskDataTestWithoutID }],
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.addManyTask(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: [fixture.taskDataTest],
    });
  });

  it("send a correct task object route+post+ip", async () => {
    stubAdd.returns({
      data: [fixture.taskDataTest],
      status: "success",
    });
    let req = {
      body: [{ ...fixture.taskDataTestWithoutID },{ ...fixture.taskDataTestWithoutID }],
      params: {},
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.addManyTask(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: [fixture.taskDataTest],
    });
  });



  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: [{ title: fixture.taskDataTest.title, state: "In progress" }],
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.addManyTask(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });

  it("send a wrong data form - Missing Property route+post+ip", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: [{ title: fixture.taskDataTest.title, state: "In progress" }],
      params: {},
      route: "/testing", method: 'post', ip: '1234'
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.addManyTask(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
