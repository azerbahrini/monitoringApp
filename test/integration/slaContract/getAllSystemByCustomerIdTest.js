var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");
let express = require("express");
var routes = require("../../../routes");
const app = require("../../../server");
const SlaContract = require("../../../models/SlaContract");
const { query } = require("express-validator");

chai.use(sinonChai);
let slaContract;
describe("GET ALL SlaContracts by Customer", () => {
  before("adding SlaContract before beginning the test", (done) => {
    slaContract = SlaContract({
      startDate: "2021-08-06T15:35:12.193+00:00",
      endDate: "2021-08-08T15:35:12.193+00:00",
      class: "613f7862b8e455ecb5ee5539",
      customer: "610d502489e61a36e88e1d27",
      listSla: ["613f774aedd5023a6781f7ad", "613f7753d4b395d5c0bf2677"],
      isActive: true,
    });
    slaContract.save().then(() => done());
  });

  it("Sends a valid Request", async () => {
    let query = {
      page: 0,
      size: 15,
    };

    const customer_Id = slaContract.customer;
    const res = await request(app)
      .get("/api/slaContract/AllSlaContractByCustomerID/" + customer_Id)
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
      .get("/api/slaContract/AllSlaContractByCustomerID/test")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  // it("Sends an invalid request - No Customer ID", async () => {
  //   const res = await request(app)
  //     .get("/api/slaContract/AllSlaContractByCustomerID/")
  //     .set("content-type", "application/json")
  //     .send({});
  //   expect(res.status).to.equal(400);
  //   console.log(res.status);
  // });
  it("Sends an invalid request - No Exist Customer ID", async () => {
    let customer_Id = "613f2534ff1edbbe626636c3";
    const res = await request(app).get(
      `/api/slaContract/AllSlaContractByCustomerID/${customer_Id}`
    );
    expect(res.status).to.equal(404);
  });

  after(() => {
    SlaContract.findByIdAndDelete(slaContract._id).then(() => done());
  });
});
