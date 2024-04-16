const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
let Sla = require("../../../models/Sla");
let SlaContract = require("../../../models/SlaContract");

const app = require("../../../server");

chai.use(sinonChai);
let sla;
const slaContractId = "614b10b183137b56985f92e9";

describe("GET BY SlaContract sla", () => {
  before("adding sla and sla before beginning the test", (done) => {
    sla = Sla({
      kpi: "response",
      unity: "hour",
      slaContract: slaContractId,
      desc: "hello sla1",
      priority: "high",
      time: 2,
    });

    sla.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    let query = {
      page: 0,
      size: 30,
    };
    const res = await request(app)
      .get("/api/sla/getbySlaContract/" + slaContractId)
      .set("content-type", "application/json")
      .query(query);
    expect(res.status).to.equal(200);
    expect(res.body.data.docs).to.be.a("array");
    expect(res.body.data.docs[0]).to.include.all.keys(
      "unity",
      "time",
      "_id",
      "priority",
      "isActive",
      "kpi",
      "desc"
    );
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const slaWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .get("/api/sla/getbysla/" + slaWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("Sla not found");
    });
  });
  after(() => {
    Sla.findByIdAndDelete(sla._id).then(() => done());
  });
});
