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
describe("Change Password User", () => {
  before("adding user before beginning the test", (done) => {
    user = User(fixture.userToRegisterWithEncryptedPassword);
    user.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .post("/api/user/changePassword/" + user._id)
      .set("content-type", "application/json")
      .send(fixture.changePasswordUser);
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("_id");
    expect(res.body.data).to.have.property("email");
    expect(res.body.data).to.have.property("password");
    expect(res.body.data).to.have.property("firstName");
    expect(res.body.data).to.have.property("lastName");
    expect(res.body.data).to.have.property("phoneNumber");
  });

  it("Sends an invalid request - Empty Body", async () => {
    const res = await request(app)
      .post("/api/user/changePassword/" + user._id)
      .set("content-type", "application/json")
      .send(fixture.emptyUser);

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .post("/api/user/changePassword/" + user._id + "?param=something")
      .set("content-type", "application/json")
      .send(fixture.changePasswordUser);
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const createStub = sinon.stub(User, "findOne").throws(new Error(""));
    const res = await request(app)
      .post("/api/user/changePassword/" + user._id)
      .set("content-type", "application/json")
      .send(fixture.changePasswordUser);
    expect(res.status).to.equal(400);
    createStub.restore();
  });
  after(() => {
    User.findByIdAndDelete(user._id).then(() => done());
  });
});
