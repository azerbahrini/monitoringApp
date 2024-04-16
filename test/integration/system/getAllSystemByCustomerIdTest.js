var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");
let express = require("express");
var routes = require("../../../routes");
const app = require("../../../server");
const System = require("../../../models/System");
const { query } = require("express-validator");

chai.use(sinonChai);
let system;
describe("GET ALL Systems by Customer", () => {
  before("adding System before beginning the test", (done) => {
    system = System({
      name: "Name",
      type: "610d502489e61a36e88e1d27",
      category: "610d502489e61a36e88e1d27",
      customer: "610d502489e61a36e88e1d27",
      deployType: "Cloud",
      deployDesc: "Cloud",
      fqdn: "fqdn",
      class: "610d502489e61a36e88e1d27",
      listInstance: [
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
      ],
      listMap: [
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
      ],
      listTechnicalUser: [
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
      ],
      listCustomerContact: [
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
      ],
      isActive: true,
    });
    system.save().then(() => done());
  });

  it("Sends a valid Request", async () => {
    let query = {
      page: 0,
      size: 15,
    };

    const customer_Id = system.customer;
    const res = await request(app)
      .get("/api/system/SystemsByCustomer/" + customer_Id)
      .set("content-type", "application/json")
      .query(query);

    expect(res.status).to.equal(200);

    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.include.property("docs");
    expect(res.body.data.docs).to.be.a("array");
    expect(res.body.data.docs[0]).to.have.property("customer");
    expect(res.body.data.docs[0]).to.have.property("isActive");
    expect(res.body.data.docs[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/system/SystemsByCustomer/test")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - No Customer ID", async () => {
    const res = await request(app).get("/api/system/SystemsByCustomer");
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - No Exist Customer ID", async () => {
    let customer_Id = "613f2534ff1edbbe626636c3";
    const res = await request(app).get(
      `/api/system/SystemsByCustomer/${customer_Id}`
    );
    expect(res.status).to.equal(404);
  });

  after(() => {
    System.findByIdAndDelete(system._id).then(() => done());
  });
});
