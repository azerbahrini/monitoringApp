const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const request = require("supertest");

const expect = chai.expect;

const User = require("../../../models/User");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);

describe("GET Microsoft User", () => {
  before("adding user before beginning the test", (done) => {
    user = new User(fixture.userToRegister);
    user.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .get("/api/user/microsoft")
      .set("content-type", "application/json")
      .send({ microsoftId: "000" });
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
  });

  it("Sends an invalid request - Body Validator Error", async () => {
    const res = await request(app)
      .get("/api/user/microsoft")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - Query Validator Error", async () => {
    const res = await request(app)
      .get("/api/user/microsoft?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });

  it("Expect to throw an Internal Error", async () => {
    const res = await request(app)
      .get("/api/user/microsoft")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  after(() => {
    User.findByIdAndDelete(user._id).then(() => done());
  });
});
