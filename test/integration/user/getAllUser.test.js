const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");

const app = require("../../../server");
let User = require("../../../models/User");
let fixture = require("./fixture.json");

chai.use(sinonChai);
let user;
describe("GET ALL User", () => {
  before("adding user before beginning the test", (done) => {
    user = User(fixture.userToRegister);
    user.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const res = await request(app)
      .get("/api/user")
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data.docs).to.be.a("array");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/roles")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(404);
  });
  after(() => {
    User.findByIdAndDelete(user._id).then(() => done());
  });
});
