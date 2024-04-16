const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
let Module = require("../../../models/Module");
const app = require("../../../server");

chai.use(sinonChai);
let moduleTest;
describe("GET BY ID module", () => {
  before("adding module before beginning the test", (done) => {
    moduleTest = Module({
        title:"Customers test 1",
        path:"/Customers"
      });  
    moduleTest.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const moduleId = moduleTest._id;
    const res = await request(app)
      .get("/api/module/getOne/" + moduleId)
      .set("content-type", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.a("object");
      expect(res.body.data).to.have.property("title");
      expect(res.body.data).to.have.property("path");
      expect(res.body.data._id).to.be.a("string");
      expect(res.body.data._id).to.be.eq(moduleTest._id.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const moduleId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .get("/api/module/getOne/" + moduleId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("module not found");
    });
  });
  after(() => {
    Module.findByIdAndDelete(moduleTest._id).then(() => done());
  });
});
