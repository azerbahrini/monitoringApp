const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const User = require("../../../models/User");

const app = require("../../../server");
const fixture = require("./fixture.json");
chai.use(sinonChai);
let user;

describe("DELETE user", () => {
  before("Create user before deleting", () => {
    user = User(fixture.userToRegister);
    user.save()
  });

  it("Sends a valid request", async () => {
    let userId = user._id;
    const res = await request(app)
      .patch(`/api/user/deleteUser/${userId}`)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .patch("/api/user/deleteUser/" + fixture.wrongId)
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Missing ID", async () => {
    const res = await request(app)
      .patch("/api/user/deleteUser")
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
  });
  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch("/api/user/deleteUser/" + user._id)
      .set("content-type", "application/json")
      .send({ libelle: "something" });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .patch("/api/user/deleteUser/" + user._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  // it("Expect to throw an Internal Error", async () => {
  //   const findOneAndRemoveStub = sinon
  //     .stub(User, "findOneAndRemove")
  //     .throws(new Error(""));
  //   const res = await request(app)
  //     .patch("/api/user/deleteUser" + user._id)
  //     .set("content-type", "application/json");
  //   expect(findOneAndRemoveStub).to.be.calledOnce;
  //   expect(res.status).to.equal(400);
  //   findOneAndRemoveStub.restore();
  // });
  after((done) => {
    User.findByIdAndDelete(user._id).then(() => done());
  });
});
