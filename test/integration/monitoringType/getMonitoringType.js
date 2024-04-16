var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

let express = require("express");
var routes = require("../../../routes");
const app = require("../../../server");
const MonitoringType = require("../../../models/MonitoringType");
//const app = express();

//app.use("/", routes);

chai.use(sinonChai);

describe("GET ALL Monitoring Types", () => {
  before("adding monitoringType before beginning the test", (done) => {
    mType = MonitoringType({ libelle: "mType test", isActive: true });
    mType.save().then(() => done());
  });

  it("Sends a valid Request", async () => {
    let query = {
      page : 0,
      size : 1
    }
    const res = await request(app)
      .get("/api/monitoringType/")
      .set("content-type", "application/json")
      .query(query);
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.include.property("docs");
    expect(res.body.data.docs).to.be.a("array");
    expect(res.body.data.docs[0]).to.have.property("libelle");
    expect(res.body.data.docs[0]).to.have.property("isActive");
    expect(res.body.data.docs[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/monitoringType/test")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  after((done) => {
    MonitoringType.findByIdAndDelete(mType._id).then(() => done());
  });
});
