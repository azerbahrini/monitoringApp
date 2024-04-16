const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
let Task = require("../../../models/Task");
const app = require("../../../server");

chai.use(sinonChai);
let task;
describe("GET BY ID task", () => {
  before("adding task before beginning the test", (done) => {
    task = Task({
        title: "task test",
        description: "desc task test",
        type: "Monitoring",
        priority: 2 ,
        user:"60a31a15b3f8622968674fd4",
    });  
      task.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const taskId = task._id;
    const res = await request(app)
      .get("/api/task/" + taskId)
      .set("content-type", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.a("object");
      expect(res.body.data).to.have.property("title");
      expect(res.body.data).to.have.property("description");
      expect(res.body.data).to.have.property("priority");
      expect(res.body.data.priority).to.be.a("number");
      expect(res.body.data._id).to.be.a("string");
      expect(res.body.data._id).to.be.eq(task._id.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const taskId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .get("/api/task/" + taskId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("task not found");
    });
  });
  after(() => {
    Task.findByIdAndDelete(task._id).then(() => done());
  });
});
