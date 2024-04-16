const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const User = require("../../../models/User");
const app = require("../../../server");
const fixture = require("./fixture.json");
chai.use(sinonChai);
// let id;
// if the send valid request fails try to check if the user exists with the same email
//or simply change user.email in the fixture
let id;
describe("Login User", () => {
  before("adding user before beginning the test", (done) => {
    user = User(fixture.userToRegisterWithEncryptedPassword);
    user.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("content-type", "application/json")
      .send(fixture.userToLogin);
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property("message");
  });
  it("Sends a valid request - Wrong Password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("content-type", "application/json")
      .send(fixture.wrongPasswordUserToLogin);
    expect(res.status).to.equal(403);
  });
  it("Sends a valid request - Wrong Email", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("content-type", "application/json")
      .send(fixture.wrongEmailUserToLogin);
    expect(res.status).to.equal(404);
  });

  it("Sends an invalid request - Empty Body", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("content-type", "application/json")
      .send(fixture.emptyTypeDataTest);

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Missing Property", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .set("content-type", "application/json")
      .send({ email: fixture.userToLogin.email });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .post("/api/auth/login?param=something")
      .set("content-type", "application/json")
      .send(fixture.userToLogin);
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const createStub = sinon.stub(User, "findOne").throws(new Error(""));
    const res = await request(app)
      .post("/api/auth/login")
      .set("content-type", "application/json")
      .send(fixture.userToLogin);
    expect(res.status).to.equal(400);
    createStub.restore();
  });
  after(() => {
    User.findByIdAndDelete(user._id).then(() => done());
  });
});
