const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");

const app = require("../../../server");
let Module = require("../../../models/Module");

chai.use(sinonChai);
let moduleTest;
describe("GET ALL module", () => {
  before("adding module before beginning the test", (done) => {
    moduleTest = Module({
        title:"Customers test 1",
        path:"/Customers"
      });  
      moduleTest.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    let query = {
      page : 0,
      size : 1
    }
    const res = await request(app)
      .get("/api/module/getAll")
      .set("content-type", "application/json")
      .query(query);
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.a('object');
      expect(res.body.data).to.include.property('docs');
      expect(res.body.data.docs).to.be.a('array');
      expect(res.body.data.docs[0]).to.be.a("object");
      expect(res.body.data.docs[0]).to.include.all.keys('title','path','_id');
      expect(res.body.data.docs[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/modules")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(404);
  });
  after(() => {
    Module.findByIdAndDelete(moduleTest._id).then(() => done());
  });
});
