var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

let express = require("express");
var routes = require("../../../routes");
var monitoringType = require("../../../models/MonitoringType");
const app = require("../../../server");

chai.use(sinonChai);
let mType;
describe("GET BY Monitoring Type ID ", () => {
  before("adding categ before beginning the test", (done) => {
    mType = new monitoringType({ libelle: "test type", isActive: true });
    mType.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const mTypeId = mType._id;
    const res = await request(app)
      .get("/api/monitoringType/" + mTypeId)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("libelle");
    expect(res.body.data).to.have.property("isActive");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(mTypeId.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const mTypeId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .get("/api/monitoringType/" + mTypeId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("monitoring Type no found");
    });
  });
  after(() => {
    monitoringType.findByIdAndDelete(mType._id).then(() => done());
  });
});
