const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Role = require("../../../models/Role");
const app = require("../../../server");

chai.use(sinonChai);
let id;
describe("Add role", () => {
  it("Sends a valid Request", async () => {
    const role = {
        label: "role test",
        isActive: false,
        rank: 6
    };
    const res = await request(app)
      .post("/api/role")
      .set("content-type", "application/json")
      .send(role);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("label");
    expect(res.body.data).to.have.property("isActive");
    expect(res.body.data.rank).to.be.a("number");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/role")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - missing property", async () => {
    const res = await request(app)
      .post("/api/role")
      .set("content-type", "application/json")
      .send({ isActive: true });
    expect(res.status).to.equal(400);
  });
  after((done) => {
    Role.findByIdAndDelete(id).then(() => done());
  });
});
