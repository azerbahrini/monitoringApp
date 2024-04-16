const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const User = require("../../../models/User");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let user;

// delete  = patch
describe("Activate User", () => {
  before("Create user before deleting", (done) => {
    user = User({
      firstName: "name",
      lastName: "last Name",
      email: "first.lastname@gmail.com",
      password: "aaaa0554689",
      phoneNumber: "+21655777999",
    });
    user.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    let query = {
      reqStatus: false,
    };
    const userId = user._id;
    const res = await request(app)
      .patch(`/api/user/activateUser/${userId}`)
      .set("content-type", "application/json")
      .query(query);
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("firstName");
    expect(res.body.data).to.have.property("lastName");
    expect(res.body.data).to.have.property("email");
    expect(res.body.data).to.have.property("password");
    expect(res.body.data).to.have.property("phoneNumber");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(user._id.toString());
  });

  it("Sends an Invalid request - non-existing userId", async () => {
    const res = await request(app)
      .patch(`/api/user/activateUser/${fixture.wrongID}`)
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .patch("/api/user/activateUser/" + user._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch(`/api/user/activateUser/${user._id}`)
      .set("content-type", "application/json")
      .send({ name: "ok" });
    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const res = await request(app)
        .patch("/api/user/activateUser/111")
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });

  after((done) => {
    User.findByIdAndDelete(user._id).then(() => done());
  });
});
