const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");

const app = require("../../../server");
const Customer = require("../../../models/Customer");

chai.use(sinonChai);
let customer;
describe("GET ALL customer", () => {
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
    const res = await request(app)
      .get("/api/customer?page=0&size=3")
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.have.property("totalDocs");
    expect(res.body.data).to.have.property("totalPages");
    expect(res.body.data).to.have.property("docs");
    expect(res.body.data.docs).to.be.a("array");
    expect(res.body.data.docs[0]).to.include.keys(
      "label",
      "address",
      "_id",
      "timeZone",
      "firstReport",
      "listMonitoringType"
    );
  });

  it("Send an invalid request - missing query", async () => {
    const res = await request(app)
      .get("/api/customer")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  after(() => {
    Customer.findByIdAndDelete(customer._id).then(() => done());
  });
});
