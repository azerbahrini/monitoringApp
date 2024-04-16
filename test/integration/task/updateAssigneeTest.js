const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
const Task = require("../../../models/Task");
const app = require("../../../server");

chai.use(sinonChai);
let task;
describe("Update Task assignee", () => {
  before("adding a task before beginning the test", (done) => {
    task = Task({
        title: "task test",
        description: "desc task test",
        type: "Monitoring",
        priority: 2 ,
        assignee:"60a31a15b3f8622968674fd4",
    });
    task.save().then(() => done());
  });
  it("Sends a valid Request",  async () => {
    const taskId = [task._id];
    const res = await request(app)
      .patch("/api/task/updateAssignee")
      .send({
        "tasks":["6090871e2b4129c3cc255555"] ,
        "assigneeId":"6089dae7c5a2a04910723333"
    })
      .set("content-type", "application/json")
     
        expect(res.status).to.equal(201);
  });

  it("Sends an invalid request - Wrong route", async () => {
   
      const taskWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .patch("/api/task/updateAssignee/wrongRoute" + taskWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(404);
    
  });
  after((done) => {
    Task.findByIdAndDelete(task._id).then(() => done());
  });
});
