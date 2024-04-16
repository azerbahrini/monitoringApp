const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Task = require("../../../models/Task");
const app = require("../../../server");

chai.use(sinonChai);
let id;
describe("Add task", () => {
  it("Sends a valid Request", async () => {
    const task = {
        title: "task test",
        description: "desc task test",
        type: "Monitoring",
        priority: 2 ,
        user:"60a31a15b3f8622968674fd4",
    };
    const res = await request(app)
      .post("/api/task/addOne")
      .set("content-type", "application/json")
      .send(task);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("title");
    expect(res.body.data).to.have.property("description");
    expect(res.body.data).to.have.property("priority");
    expect(res.body.data.priority).to.be.a("number");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/task/addOne")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - missing property", async () => {
    const res = await request(app)
      .post("/api/task/addOne")
      .set("content-type", "application/json")
      .send({ title: "task test 1" });
    expect(res.status).to.equal(400);
  });
  after((done) => {
    Task.findByIdAndDelete(id).then(() => done());
  });
});
