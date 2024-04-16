const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");

const app = require("../../../server");
let Task = require("../../../models/Task");

chai.use(sinonChai);
let task;
describe("GET ALL task", () => {
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
    let query = {
      page : 0,
      size : 1
    }
    const res = await request(app)
      .get("/api/task")
      .set("content-type", "application/json")
      .query(query);
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.a('object');
      expect(res.body.data).to.include.property('docs');
      expect(res.body.data.docs).to.be.a('array');
      expect(res.body.data.docs[0]).to.be.a("object");
      expect(res.body.data.docs[0]).to.include.all.keys('title','description','_id','priority','user');
      expect(res.body.data.docs[0].priority).to.be.a("number");
      expect(res.body.data.docs[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(404);
  });
  after(() => {
    Task.findByIdAndDelete(task._id).then(() => done());
  });
});
