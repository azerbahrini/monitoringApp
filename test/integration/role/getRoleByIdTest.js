const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
let Role = require("../../../models/Role");
const app = require("../../../server");

chai.use(sinonChai);
let role;
describe("GET BY ID role", () => {
  before("adding role before beginning the test", (done) => {
    role = Role({ label: "role test",
    isActive: false,
    rank: 6 });  
      role.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const roleId = role._id;
    const res = await request(app)
      .get("/api/role/" + roleId)
      .set("content-type", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.a("object");
      expect(res.body.data).to.have.property("label");
      expect(res.body.data).to.have.property("isActive");
      expect(res.body.data._id).to.be.a("string");
      expect(res.body.data._id).to.be.eq(role._id.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const roleId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .get("/api/role/" + roleId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(404);
      expect(res.body.message).to.be.a("string");
      expect(res.body.message).to.be.eq("role not found");
    });
  });
  after(() => {
    Role.findByIdAndDelete(role._id).then(() => done());
  });
});
