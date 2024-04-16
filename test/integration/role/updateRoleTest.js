const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
const Role = require("../../../models/Role");
const app = require("../../../server");

chai.use(sinonChai);
let role;
describe("PUT role", () => {
  before("adding a role before beginning the test", (done) => {
    role = Role({ label: "role test",
    isActive: true,
    rank: 6 });
    role.save().then(() => done());
  });
  it("Sends a valid Request", (done) => {
    const roleId = role._id;
    request(app)
      .patch("/api/role/update/" + roleId.toString())
      .send({ label: "up test" })
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("label");
        expect(res.body.data).to.have.property("isActive");
        expect(res.body.data.rank).to.be.a("number");
        expect(res.body.data._id).to.be.a("string");
        done();
      })
      .catch((err) => done(err));
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const roleWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .put("/api/role/update/" + roleWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });
  after((done) => {
    Role.findByIdAndDelete(role._id).then(() => done());
  });
});
