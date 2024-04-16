const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../../server");
const RoleHistory = require("../../../models/RoleHistory");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let id;
describe("Add RoleHistory", () => {
  it("Sends a valid Request", async () => {
    const roleHistory = fixture.roleHistoryDataTestWithoutID;
    const res = await request(app)
      .post("/api/roleHistory")
      .set("content-type", "application/json")
      .send(roleHistory);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("startDate");
    expect(res.body.data).to.have.property("endDate");
    expect(res.body.data.startDate).to.have.lengthOf(24);
    expect(res.body.data.endDate).to.have.lengthOf(24);
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/roleHistory")
      .set("content-type", "application/json")
      .send(fixture.emptyRoleHistoryDataTest);

    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - missing property", async () => {
    const res = await request(app)
      .post("/api/roleHistory")
      .set("content-type", "application/json")
      .send({ active: true });
    expect(res.status).to.equal(400);
  });
  after((done) => {
    RoleHistory.findByIdAndDelete(id).then(() => done());
  });
});
