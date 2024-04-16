const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const SlaContract = require("../../../models/SlaContract");
const app = require("../../../server");
const Customer = require("../../../models/Customer");

chai.use(sinonChai);
const customer = "608bde23c5a2a0a1607294a5";
const classId = "608be15ec5a2a054387294ab";

let id;
describe("Add slaContract", () => {
  it("Sends a valid Request", async () => {
    const slaContract = {
      startDate: "2021-12-02",
      endDate: "2023-12-02",
      class: classId,
      customer: customer,
    };
    const res = await request(app)
      .post("/api/slaContract")
      .set("content-type", "application/json")
      .send(slaContract);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("startDate");
    expect(res.body.data).to.have.property("endDate");
    expect(res.body.data).to.have.property("class");
    expect(res.body.data.startDate).to.have.lengthOf(24);
    expect(res.body.data.endDate).to.have.lengthOf(24);
    expect(res.body.data.class).to.be.a("string");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/slaContract")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - missing property", async () => {
    const res = await request(app)
      .post("/api/slaContract")
      .set("content-type", "application/json")
      .send({ active: true });
    expect(res.status).to.equal(400);
  });
  after((done) => {
    SlaContract.findByIdAndDelete(id).then(() => done());
  });
});
