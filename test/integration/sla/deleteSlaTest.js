const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Sla = require("../../../models/Sla");

let express = require("express");

const app = require("../../../server");

chai.use(sinonChai);
let sla;
const slaContractId = "608bde23c5a2a0a1607294a5";
// delete  = patch
describe("DELETE sla", () => {
  before("Create user before deleting", (done) => {
    sla = Sla( {
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
      .patch("/api/sla/delete/" + slaId)
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
      const slaWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .patch("/api/sla/delete/" + slaWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });

  after((done) => {
    Sla.findByIdAndDelete(sla._id).then(() => done());
  });
});
