var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

let express = require("express");
var routes = require("../../../routes");
var category = require("../../../models/Category");
const app = require("../../../server");

chai.use(sinonChai);
let categ;
describe("GET BY CATEGORY ID ", () => {
  before("adding categ before beginning the test", (done) => {
    categ = new category({ category: "test Category", isActive: true });
    categ.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const categoryId = categ._id;
    const res = await request(app)
      .get("/api/category/" + categoryId)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("category");
    expect(res.body.data).to.have.property("active");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(categoryId.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const categoryId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .get("/api/category/" + categoryId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("Category no found");
    });
  });
  after(() => {
    category.findByIdAndDelete(categ._id).then(() => done());
  });
});
