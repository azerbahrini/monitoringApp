const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Task = require("../../../models/Task");
const app = require("../../../server");

chai.use(sinonChai);
let task;
let task2;
let task3;
describe("Validate Task controller Test", () => {
  before("adding a task before beginning the test", (done) => {
    task = Task({
      title: "SM12",
      description: "SAP Transaction",
      type: "Monitoring",
      map: "60905d102b412970c92c866e",
      globalStatus: "Critical",
      priority: 2,
      estimatedStart: "2021-05-04T00:30:00.000Z",
      timeSpent: 4,
      state: "To be validated",
      assignee: "6089dae7c5a2a04910729391",
      system: "608beed8c5a2a0c3017294b9",
      resultat: ["60908c3b2b4129615e2c8767"],
      createdAt: "2021-05-03T20:49:07.366Z",
      updatedAt: "2021-11-04T11:03:52.712Z",
    });
    task2 = Task({
      title: "SM12",
      description: "SAP Transaction",
      type: "Monitoring",
      map: "60905d102b412970c92c866e",
      globalStatus: "Critical",
      priority: 2,
      estimatedStart: "2021-05-04T00:30:00.000Z",
      timeSpent: 4,
      state: "Done",
      assignee: "6089dae7c5a2a04910729391",
      system: "608beed8c5a2a0c3017294b9",
      resultat: ["60908c3b2b4129615e2c8767"],
      createdAt: "2021-05-03T20:49:07.366Z",
      updatedAt: "2021-11-04T11:03:52.712Z",
    });
    task3 = Task({
      title: "SM12",
      description: "SAP Transaction",
      type: "Monitoring",
      map: "60905d102b412970c92c866e",
      globalStatus: "Critical",
      priority: 2,
      estimatedStart: "2021-05-04T00:30:00.000Z",
      timeSpent: 4,
      state: "Done",
      assignee: "6089dae7c5a2a04910729391",
      system: "608beed8c5a2a0c3017294b9",
      resultat: ["60908c3b2b4129615e2c8767"],
      createdAt: "2021-05-03T20:49:07.366Z",
      updatedAt: "2021-11-04T11:03:52.712Z",
      ehclkebcebcke:"elkchnlkebcjklecbkj"
    });

    task.save();
    task3.save();
    task2.save().then(() => done());
  });
  it("Sends a valid Request", (done) => {
    const taskId = task._id;
    request(app)
      .put("/api/task/validateTask/" + taskId.toString())
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.keys(
          "_id",
          "title",
          "description",
          "type",
          "map",
          "globalStatus",
          "priority",
          "estimatedStart",
          "timeSpent",
          "state",
          "assignee",
          "system",
          "resultat",
          "createdAt",
          "updatedAt",
          "__v"
        );
        expect(res.body.data.state).to.be.a("string");
        expect(res.body.data.state).to.be.eq("Pending");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.a("string");
        expect(res.body.message).to.be.eq("Successfully Validated the task");
        done();
      })
      .catch((err) => done(err));
  });

  it("returns a 404 error", (done) => {
    const taskId = "Invalid ID";
    request(app)
      .put("/api/task/validateTask/" + taskId)
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.a("string");
        expect(res.body.message).to.be.eq("No task can be found with this ID.");
        done();
      })
      .catch((err) => done(err));
  });
  it("returns a 400 error", (done) => {
    const taskId = task2._id;
    request(app)
      .put("/api/task/validateTask/" + taskId)
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.a("string");
        expect(res.body.message).to.be.eq(`Cannot change the Task State from ${task2.state} to Pending.`);
        done();
      })
      .catch((err) => done(err));
  });

  after((done) => {
    Task.findByIdAndDelete(task._id).then(() => done());
  });
});
