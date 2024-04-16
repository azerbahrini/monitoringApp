const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
const Customer = require("../../../models/Customer");
const app = require("../../../server");

chai.use(sinonChai);
let customer;
describe("PUT customer", () => {
  before("adding a customer before beginning the test", (done) => {
    customer = Customer({
        "label":"customer 4",
        "isActive": false,
        "address": "nabel",
        "timeZone": "tunis,madrid",
        "firstReport": "23:00",
        "listMonitoringType":"61016d525f7a4b5864f1daca"
        });
    customer.save().then(() => done());
  });
  it("Sends a valid Request", (done) => {
    const customerId = customer._id;
    request(app)
      .patch("/api/customer/update/" + customerId.toString())
      .send({ label: "up test" })
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("label");
        expect(res.body.data).to.have.property("isActive");
        expect(res.body.data).to.have.property("listMonitoringType");
        expect(res.body.data).to.have.property("firstReport");
        expect(res.body.data).to.have.property("timeZone");
        expect(res.body.data.timeZone).to.be.a("array");
        expect(res.body.data.listMonitoringType).to.be.a("array");
        expect(res.body.data._id).to.be.a("string");
        done();
      })
      .catch((err) => done(err));
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const customerWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .put("/api/customer/update/" + customerWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });
  after((done) => {
    Customer.findByIdAndDelete(customer._id).then(() => done());
  });
});
