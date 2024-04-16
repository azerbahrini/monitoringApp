var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

let express = require("express");
var routes = require("../../../routes");
const app = require("../../../server");
const Category = require("../../../models/Category");
const { query } = require("express-validator");
//const app = express();

//app.use("/", routes);

chai.use(sinonChai);

describe("GET ALL Categories", () => {
  before("adding Category before beginning the test", (done) => {
    category = Category({ category: "sysclas test", isActive: true });
    category.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    let query = {
      page : 0,
      size : 1
    }
    const res = await request(app)
      .get("/api/category")
      .set("content-type", "application/json")
      .query(query);
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.include.property("docs");
    expect(res.body.data.docs).to.be.a("array");
    expect(res.body.data.docs[0]).to.have.property("category");
    expect(res.body.data.docs[0]).to.have.property("active");
    expect(res.body.data.docs[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/category/test")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  after(() => {
    Category.findByIdAndDelete(category._id).then(() => done());
  });
});

/* 
describe('Get All Categories', () => {
    it('Sends a valid request to  get all the Categories', async () => {
     
        const res = await request(app).get("api/category/category");
        expect(res.status).to.equal(200);
        expect(res.body).to.be('object');
        
        
    })

})
 */
