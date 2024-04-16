const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
const Module = require("../../../models/Module");
const app = require("../../../server");

chai.use(sinonChai);
let moduleTest;
describe("PUT module", () => {
  before("adding a module before beginning the test", (done) => {
    moduleTest = Module({
        title:"Customers test 1",
        path:"/Customers"
      });
    moduleTest.save().then(() => done());
  });
  it("Sends a valid Request", (done) => {
    const moduleId = moduleTest._id;
    request(app)
      .patch("/api/module/" + moduleId.toString())
      .send({ title: "up test" })
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("title");
        expect(res.body.data).to.have.property("path");
        expect(res.body.data._id).to.be.a("string");
        done();
      })
      .catch((err) => done(err));
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const moduleWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .patch("/api/module/" + moduleWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(404);
    });
  });
  after((done) => {
    Module.findByIdAndDelete(moduleTest._id).then(() => done());
  });
});
