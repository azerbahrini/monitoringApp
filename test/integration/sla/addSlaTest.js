const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Sla = require("../../../models/Sla");
const app = require("../../../server");
const SlaContract = require("../../../models/SlaContract");

chai.use(sinonChai);
const slaContract = "6109b0cd940d6406e8973644";

let id;
describe("Add sla", () => {
  it("Sends a valid Request", async () => {
    const sla = {
      unity: "hour",
      slaContract: slaContract,
      desc: "hello sla1",
      priority: "high",
      kpi: "takeOver",
      time: 2,
    };

    const res = await request(app)
      .post("/api/sla/")
      .set("content-type", "application/json")
      .send(sla);

    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("kpi");
    expect(res.body.data).to.have.property("unity");
    expect(res.body.data).to.have.property("isActive");
    expect(res.body.data).to.have.property("desc");
    expect(res.body.data).to.have.property("priority");
    expect(res.body.data).to.have.property("time");
    expect(res.body.data.time).to.be.a("number");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/sla")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - missing property", async () => {
    const res = await request(app)
      .post("/api/sla")
      .set("content-type", "application/json")
      .send({ active: true });
    expect(res.status).to.equal(400);
  });
  after((done) => {
    Sla.findByIdAndDelete(id).then(() => done());
  });
});
