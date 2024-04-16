const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const taskController = require("../../../../controllers/task.controller");
const taskService = require("../../../../services/task");

describe("controller UPDATE Task's Assignee test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(taskService, "updateAssigneeTasks");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return updated assignee ", async () => {
    stubUpdate.returns({
      data: {
        "n": 0,
        "nModified": 0,
        "ok": 1
    },
      status: "success",
    });
    let req = {
      body: {
        "tasks":["6090871e2b4129c3cc255555"] ,
        "assigneeId":"6089dae7c5a2a04910723333"
    }
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.updateAssigneeTasks(req, res);
    expect(stubUpdate).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
        "data": {
            "n": 0,
            "nModified": 0,
            "ok": 1
        }
    });
  });
  it("expect to return an error - Update Assignee incomplete", async () => {
    stubUpdate.returns({
       
        err: { message: "Not All Tasks Updated." },
        
        status: "incomplete",
        statusCode: 400,
      });
    let req = {
        body: {
          "tasks":["6090871e2b4129c3cc255555"] ,
          "assigneeId":"6089dae7c5a2a04910723333"
      }
      };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.updateAssigneeTasks(req, res);
    expect(stubUpdate).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith(
    { error: { message: 'Not All Tasks Updated.' }, data: undefined });
  });

  it("expect to return an error ", async () => {
    stubUpdate.returns({
      err: { message: "task not found" },
      status: "error",
      statusCode: 204,
    });
    let req = {
      body: {
        "tasks":["6090871e2b4129c3cc255555"] ,
        "assigneeId":"6089dae7c5a2a04910723333"
    },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.updateAssigneeTasks(req, res);
    expect(stubUpdate).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).be.calledWith({
      message: "task not found",
    });
  });
});
