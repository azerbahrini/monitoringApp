const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
let Sla = require("../../../models/Sla");
const app = require("../../../server");

chai.use(sinonChai);
let sla;
const slaContractId = "6109b0cd940d6406e8973644";

describe("GET BY ID sla", () => {
  before("adding sla before beginning the test", (done) => {
    sla = Sla({
      kpi:"response",
      unity:"hour",
      slaContractId:slaContractId,
      desc:"hello sla1",
      priority:"high",
      time:2
    });  
      sla.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const slaId = sla._id;
    const res = await request(app)
      .get("/api/sla/getone/" + slaId)
      .set("content-type", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.a("object");
      expect(res.body.data).to.have.property("kpi");
      expect(res.body.data).to.have.property("unity");
      expect(res.body.data).to.have.property("isActive");
      expect(res.body.data).to.have.property("desc");
      expect(res.body.data).to.have.property("priority");
      expect(res.body.data).to.have.property("time");
      expect(res.body.data.time).to.be.a("number");
      expect(res.body.data._id).to.be.a("string");
      expect(res.body.data._id).to.be.eq(sla._id.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const slaId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .get("/api/sla/getone/" + slaId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("sla not found");
    });
  });
  after(() => {
    Sla.findByIdAndDelete(sla._id).then(() => done());
  });
});
