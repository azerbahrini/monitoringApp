const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Licence = require("../../../models/Licence");
const app = require("../../../server");

chai.use(sinonChai);
const customerId = "608bde23c5a2a0a1607294a5";
let id;
describe("Add licence", () => {
  it("Sends a valid Request", async () => {
    const licence = {
      startDate: "3000-10-25",
      endDate: "3001-12-02",
      customer: customerId
    };
    const res = await request(app)
      .post("/api/licence")
      .set("content-type", "application/json")
      .send(licence);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("startDate");
    expect(res.body.data).to.have.property("endDate");
    expect(res.body.data).to.have.property("isActive");
    expect(res.body.data.startDate).to.have.lengthOf(24);
    expect(res.body.data.endDate).to.have.lengthOf(24);
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/licence")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - missing property", async () => {
    const res = await request(app)
      .post("/api/licence")
      .set("content-type", "application/json")
      .send({ active: true });
    expect(res.status).to.equal(400);
  });
  after((done) => {
    Licence.findByIdAndDelete(id).then(() => done());
  });
});
