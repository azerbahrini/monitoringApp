const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
let Customer = require("../../../models/Customer");
const app = require("../../../server");

chai.use(sinonChai);
let customer;
describe("GET BY ID customer", () => {
  before("adding customer before beginning the test", (done) => {
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
  it("Sends a valid Request", async () => {
    const customerId = customer._id;
    const res = await request(app)
      .get("/api/customer/" + customerId)
      .set("content-type", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.a("object");
      expect(res.body.data).to.have.property("label");
      expect(res.body.data).to.have.property("isActive");
      expect(res.body.data).to.have.property("address");
      expect(res.body.data).to.have.property("firstReport");
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const customerId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .get("/api/customer/" + customerId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("customer not found");
    });
  });
  after(() => {
    Customer.findByIdAndDelete(customer._id).then(() => done());
  });
});
