var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

let express = require("express");
var routes = require("../../../routes");
const monitoringType = require("../../../models/MonitoringType");
const app = require("../../../server");

chai.use(sinonChai);
let mType;
describe("Update monitoringType", () => {
  before("adding a monitoringType before beginning the test", (done) => {
    mType = monitoringType({ libelle: "test update", isActive: true });
    mType.save().then(() => done());
  });

  it("Sends a valid Request", (done) => {
    const mTypeId = mType._id;

    request(app)
      .patch("/api/monitoringType/update/" + mTypeId.toString())
      .send({ libelle: "new update" })
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("libelle");
        expect(res.body.data).to.have.property("isActive");
        expect(res.body.data._id).to.be.a("string");
        expect(res.body.data._id).to.be.eq(mTypeId.toString());
        done();
      })
      .catch((err) => done(err));
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const mTypeWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .patch("/api/monitoringType/update" + mTypeWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });
  after((done) => {
    monitoringType.findByIdAndDelete(mType._id).then(() => done());
  });
});
