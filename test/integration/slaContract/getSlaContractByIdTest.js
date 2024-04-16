const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
let SlaContract = require("../../../models/SlaContract");
const app = require("../../../server");

chai.use(sinonChai);
let slaContract;
const customerId = "608bde23c5a2a0a1607294a5";
const classId = "608be15ec5a2a054387294ab";
describe("GET BY ID slaContract", () => {
  before("adding slaContract before beginning the test", (done) => {
    slaContract = SlaContract({
      startDate: "2021-12-02",
      endDate: "2023-12-02",
      class: classId,
      customerId: customerId
    });  
      slaContract.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const slaContractId = slaContract._id;
    const res = await request(app)
      .get("/api/slaContract/getone/" + slaContractId)
      .set("content-type", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.a("object");
      expect(res.body.data).to.have.property("startDate");
      expect(res.body.data).to.have.property("endDate");
      expect(res.body.data).to.have.property("isActive");
      expect(res.body.data).to.have.property("class");
      expect(res.body.data.startDate).to.have.lengthOf(24);
      expect(res.body.data.endDate).to.have.lengthOf(24);
      expect(res.body.data.class).to.be.a("object");
      expect(res.body.data._id).to.be.a("string");
      expect(res.body.data._id).to.be.eq(slaContract._id.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const slaContractId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .get("/api/slaContract/getone/" + slaContractId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("slaContract not found");
    });
  });
  after(() => {
    SlaContract.findByIdAndDelete(slaContract._id).then(() => done());
  });
});
