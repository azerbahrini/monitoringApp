const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const System = require("../../../models/System");

let express = require("express");

const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let system;

// delete  = patch
describe("DELETE system", () => {
  before("Create system before deleting", (done) => {
    system = System(fixture.SystemDataTestWithoutID);   
     system.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const systemId = system._id;
    const res = await request(app)
      .patch(`/api/system/delete/${systemId}`)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("name");
    expect(res.body.data).to.have.property("isActive");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(system._id.toString());
  });


  it("Sends an Invalid request - non-existing systemId", async () => {
    const res = await request(app)
      .patch(`/api/system/delete/${fixture.wrongID}`)
      .set("content-type", "application/json")
      expect(res.status).to.equal(404);
  });

  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .patch("/api/system/delete/" + system._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });


  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch(`/api/system/delete/${system._id}`)
      .set("content-type", "application/json")
      .send({name: "ok" });
    expect(res.status).to.equal(400);
  });
  

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const res = await request(app)
        .patch("/api/system/delete/111" )
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });


  after((done) => {
    System.findByIdAndDelete(system._id).then(() => done());
  });
});
