const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
let SlaContract = require("../../../models/SlaContract");
let Customer = require("../../../models/SlaContract");
const app = require("../../../server");

chai.use(sinonChai);
let slaContract;
const customerId = "608bde23c5a2a0a1607294a5";
const classId = "608be15ec5a2a054387294ab";
describe("GET BY Customer slaContract", () => {
  before("adding customer and slaContract before beginning the test", (done) => {

    slaContract = SlaContract({
      startDate: "2021-12-02",
      endDate: "2023-12-02",
      class: classId,
      customerId: customerId
    });  
    slaContract.save().then(
      Customer.updateOne(
        {
          _id: customerId,
        },
        { $push: { listSlaContract: slaContract._id } }
      )
        .then(() => done())

    );


  });
  it("Sends a valid Request", async () => {
    const res = await request(app)
      .get("/api/slaContract/getbycustomer/" + customerId)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a('array');
    res.body.data.forEach(slaContract => {
      expect(slaContract).to.include.all.keys('startDate', 'endDate', '_id', 'isActive',"class");
    });
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const customerWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .get("/api/slaContract/getbycustomer/" + customerWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("Customer not found");
    });
  });
  after(() => {

    Customer.findByIdAndUpdate(
      {
        _id: customerId,
      },
      { $pull: { listSlaContract: slaContract._id } }
    ) .then(
      SlaContract.findByIdAndDelete(slaContract._id).then(() => done())
      );
     
  });
});
