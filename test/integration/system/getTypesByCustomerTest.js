var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");
let express = require("express");
var routes = require("../../../routes");
const app = require("../../../server");
const System = require("../../../models/System");
const Type = require("../../../models/Type");
const { query } = require("express-validator");

chai.use(sinonChai);
let type;
let system;
describe("GET ALL SystemsTypes by Customer", () => {
  before("adding System and Type before beginning the test", (done) => {
    type = Type({ type: "DEV", active: true });
    type.save();

    system = System({
      name: "Name",
      type: type._id,
      category: "610d502489e61a36e88e1d27",
      customer: "610d502489e61a36e88e1d27",
      deployType: "Cloud",
      deployDesc: "Cloud",
      fqdn: "fqdn",
      class: "610d502489e61a36e88e1d27",
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
    const customer_Id = system.customer;
    const res = await request(app)
      .get("/api/system/getTypesbyCustomerId/" + customer_Id)
      .set("content-type", "application/json")
      .query();
    expect(res.status).to.equal(200);
    expect(res.body).to.be.a("object");
    expect(res.body).to.include.property("data");
    expect(res.body.data).to.be.a("array");
    expect(res.body.data[0]).to.have.property("_id");
    expect(res.body.data[0]).to.have.property("type");
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
    Type.findByIdAndDelete(type._id).then(() => done());
  });
});
