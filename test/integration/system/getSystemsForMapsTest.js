const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

const express = require("express");
const app = require("../../../server");
const System = require("../../../models/System");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let  system 
describe("GET Systems for Maps", () => {
  before("adding System before beginning the test", (done) => {
    system = System(fixture.SystemDataTestWithoutID);
    system.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const res = await request(app)
      .get("/api/system/forMaps?customerId=608bde23c5a2a0a1607294a5&typeId=60ee0042d9b53b3e089209f5&categoryId=60ee0042d0b53b3e089209f6")
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.a("Object");  
    expect(res.body.data[0]).to.have.property("name");
    expect(res.body.data[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/system/test")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  after(() => {
    //System.findByIdAndDelete(system._id).then(() => done());
  });
});


