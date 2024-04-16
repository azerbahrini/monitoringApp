const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Task = require("../../../models/Task");
const app = require("../../../server");

chai.use(sinonChai);
let ids=[];
describe("Add Many task", () => {
  it("Sends a valid Request", async () => {
    const tasks = [{
        title: "task test",
        description: "desc task test",
        type: "Monitoring",
        priority: 2 ,
        user:"60a31a15b3f8622968674fd4",
    },
    {
      title: "task test 2",
      description: "desc task test 2",
      type: "Monitoring",
      priority: 3 ,
      user:"60a31a15b3f8622968674fd4",
  }
  ];
    const res = await request(app)
      .post("/api/task/addMany")
      .set("content-type", "application/json")
      .send(tasks);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("array");
    expect(res.body.data[0]).to.include.all.keys('title','description','_id','priority','user');
    expect(res.body.data[0]._id).to.be.a("string");
    res.body.data.map(task=>{
      ids.push(task._id.toString());
    })
  });

  it("Sends an invalid request - object body", async () => {
    const res = await request(app)
      .post("/api/task/addMany")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/task/addMany")
      .set("content-type", "application/json")
      .send([]);

    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - missing property", async () => {
    const res = await request(app)
      .post("/api/task/addMany")
      .set("content-type", "application/json")
      .send([{ title: "task test 1" }]);
    expect(res.status).to.equal(400);
  });
  after((done) => {
    Task.deleteMany({_id: { $in: ids}}).then(() => done());
  });
});
