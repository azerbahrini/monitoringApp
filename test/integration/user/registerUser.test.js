const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../../models/User");
const app = require("../../../server");
const fixture = require("./fixture.json");
chai.use(sinonChai);
let id;

describe("Register User", () => {
  it("Sends a valid request", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .set("content-type", "application/json")
      .send(fixture.userToRegister);
    
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("message");
   // id = await jwt.verify(res.body.data.token, config.get("jwtSecret")).user.id;
  });

  it("Sends an invalid request - Empty Body", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .set("content-type", "application/json")
      .send(fixture.emptyTypeDataTest);

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Missing Property", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .set("content-type", "application/json")
      .send({ firstName: fixture.userToRegister.firstName });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .post("/api/auth/register?param=something")
      .set("content-type", "application/json")
      .send(fixture.userToRegister);
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const createStub = sinon.stub(User.prototype, "save").throws(new Error(""));
    const res = await request(app)
      .post("/api/auth/register")
      .set("content-type", "application/json")
      .send(fixture.userToRegister);
    expect(res.status).to.equal(400);
    createStub.restore();
  });
  after((done) => {
    User.findByIdAndDelete(id).then(() => done());
  });
});
