var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");
let express = require("express");
var routes = require("../../../routes");
const app = require("../../../server");
const Map = require("../../../models/MonitoringActivityPlannification");
const { query } = require("express-validator");


chai.use(sinonChai);
let map
describe("GET ALL Maps by System", () => {
  before("adding Map before beginning the test", (done) => {
    map = Map({ periodicity: 5, active: true , system :"608be0f0c5a2a0bd397294aa" ,estimation : 200 , startTime : "2021-08-06T15:07:16.796+00:00"});
    map.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    let query = {
      page : 0,
      size : 1
    }
    const sysId = map.system
    const res = await request(app)
      .get("/api/map/getBySystemId/"+sysId )
      .set("content-type", "application/json")
      .query(query);
    expect(res.status).to.equal(200);
   
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.include.property("docs");
    expect(res.body.data.docs).to.be.a("array");
    expect(res.body.data.docs[0]).to.have.property("periodicity");
    expect(res.body.data.docs[0]).to.have.property("active");
    expect(res.body.data.docs[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/map/getBySystemId/test")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });


  it("Sends an invalid request - No System ID", async () => {
    const res = await request(app)
      .get("/api/map/getBySystemId/")
      .set("content-type", "application/json")
      .send({});
    expect(res.status).to.equal(400);
  });


  after(() => {
    Map.findByIdAndDelete(map._id).then(() => done());
  });
});
