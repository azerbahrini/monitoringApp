const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Customer = require("../../../models/Customer");
const app = require("../../../server");

chai.use(sinonChai);
let id;
describe("Add customer", () => {
  it("Sends a valid Request", async () => {
    const customer = {
        "label":"customer 4",
        "isActive": "false",
        "address": "nabel",
        "firstReport": "23:00",
        "timeZone": "tunis,madrid",
        "listMonitoringType":"61016d525f7a4b5864f1daca"
        };
    const res = await request(app)
      .post("/api/customer")
      .set("content-type", "application/json")
      .send(customer);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("label");
    expect(res.body.data).to.have.property("isActive");
    expect(res.body.data).to.have.property("address");
    expect(res.body.data).to.have.property("firstReport");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/customer")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - missing property", async () => {
    const res = await request(app)
      .post("/api/customer")
      .set("content-type", "application/json")
      .send({ isActive: true });
    expect(res.status).to.equal(400);
  });
  after((done) => {
    Customer.findByIdAndDelete(id).then(() => done());
  });
});
