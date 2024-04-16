var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");
var category = require("../../../models/Category");
const app = require("../../../server");

chai.use(sinonChai);
let id;
describe("Add a category", () => {
  it("Sends a valid Request", async () => {
    const category = {
      category: "test1",
      active: true,
    };
    const res = await request(app)
      .post("/api/category")
      .set("content-type", "application/json")
      .send(category);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("category");
    expect(res.body.data).to.have.property("active");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/category")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - missing property", async () => {
    const res = await request(app)
      .post("/api/category")
      .set("content-type", "application/json")
      .send({ active: true });
    expect(res.status).to.equal(400);
  });
  after((done) => {
    category.findByIdAndDelete(id).then(() => done());
  });
});
