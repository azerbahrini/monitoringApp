const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");

const app = require("../../../server");
let Role = require("../../../models/Role");

chai.use(sinonChai);
let role;
describe("GET ALL role", () => {
  before("adding role before beginning the test", (done) => {
    role = Role({ label: "role test",
    isActive: true,
    rank: 6 });  
      role.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    let query = {
      page : 0,
      size : 1,
      paginate: true
    }
    const res = await request(app)
      .get("/api/role")
      .set("content-type", "application/json")
      .query(query);
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.a('object');
      expect(res.body.data).to.include.property('docs');
      expect(res.body.data.docs).to.be.a('array');

      expect(res.body.data.docs[0]).to.be.a("object");
      expect(res.body.data.docs[0]).to.include.all.keys('label','listModule','_id','isActive','rank');
      expect(res.body.data.docs[0].isActive).to.deep.equal(true);
      expect(res.body.data.docs[0].rank).to.be.a("number");
      expect(res.body.data.docs[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/roles")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(404);
  });
  after(() => {
    Role.findByIdAndDelete(role._id).then(() => done());
  });
});
