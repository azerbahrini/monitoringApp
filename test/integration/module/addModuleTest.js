const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Module = require("../../../models/Module");
const app = require("../../../server");

chai.use(sinonChai);
let id;
describe("Add module", () => {
  it("Sends a valid Request", async () => {
    const module = {
      title:"Customers test 1",
      path:"/Customers"
    };
    const res = await request(app)
      .post("/api/module")
      .set("content-type", "application/json")
      .send(module);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("title");
    expect(res.body.data).to.have.property("path");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/module")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - missing property", async () => {
    const res = await request(app)
      .post("/api/module")
      .set("content-type", "application/json")
      .send({ title: "teste" });
    expect(res.status).to.equal(400);
  });
  after((done) => {
    Module.findByIdAndDelete(id).then(() => done());
  });
});
