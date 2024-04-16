const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../../server");
const User = require("../../../models/User");
let fixture = require("./fixture.json");

chai.use(sinonChai);
let user;
describe("GET ALL Users 2", () => {
  before("adding user before beginning the test", () => {
    user = User({
      firstName: "firstNameExemple",
      lastName: "lastNameExemple",
      email: "email@gmail.com",
      password: "123456789",
      phoneNumber: "12345689",
      microsoftId: "000",
      isActive: true,
    });
    user.save();
  });
  it("Sends a valid Request", async () => {
    const res = await request(app)
      .get("/api/user/getAllUsers")
      .set("content-type", "application/json")
      .query({ page: 0, size: 1 });
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data.docs).to.be.a("array");
    expect(res.body.data.docs[0]).to.include.all.keys(
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "microsoftId"
    );
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/user/getAllUsers/WrongRoute")
      .set("content-type", "application/json");

    expect(res.status).to.equal(404);
  });
  after(() => {
    User.findByIdAndDelete(user._id).then(() => done());
  });
});
