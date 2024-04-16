const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Role = require("../../../models/Role");

let express = require("express");

const app = require("../../../server");

chai.use(sinonChai);
let role;

// delete  = patch
describe("DELETE role", () => {
  before("Create user before deleting", (done) => {
    role = Role({ label: "role test",
    isActive: true,
    rank: 6 });   
     role.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const roleId = role._id;
    const res = await request(app)
      .patch("/api/role/delete/" + roleId)
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
      const roleWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .patch("/api/role/delete/" + roleWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });

  after((done) => {
    Role.findByIdAndDelete(role._id).then(() => done());
  });
});
