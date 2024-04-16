var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

let express = require("express");
var routes = require("../../../routes");
const category = require("../../../models/Category");
const app = require("../../../server");

chai.use(sinonChai);
let categ;
describe("PUT category", () => {
  before("adding a category before beginning the test", (done) => {
    categ = category({ category: "test update", isActive: true });
    categ.save().then(() => done());
  });
  
  it("Sends a valid Request", (done) => {
    const categoryId = categ._id;

    request(app)
      .patch("/api/category/" + categoryId.toString())
      .send({ category: "new update" })
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("category");
        expect(res.body.data).to.have.property("active");
        expect(res.body.data._id).to.be.a("string");
        expect(res.body.data._id).to.be.eq(categoryId.toString());
        done();
      })
      .catch((err) => done(err));
  });



  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const categoryWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .patch("/api/category/" + categoryWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });
  after((done) => {
    category.findByIdAndDelete(categ._id).then(() => done());
  });
});
