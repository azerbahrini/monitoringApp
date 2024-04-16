const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
const Sla = require("../../../models/Sla");
const app = require("../../../server");

chai.use(sinonChai);
let sla;
const slaContractId = "6109b0cd940d6406e8973644";

describe("PUT sla", () => {
  before("adding a sla before beginning the test", (done) => {
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
  it("Sends a valid Request", (done) => {
    const slaId = sla._id;
    request(app)
      .patch("/api/sla/update/" + slaId.toString())
      .send({
        desc:"hello sla2"
      })
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(201);
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
        done();
      })
      .catch((err) => done(err));
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const slaWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .put("/api/sla/update/" + slaWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });
  after((done) => {
    Sla.findByIdAndDelete(sla._id).then(() => done());
  });
});
