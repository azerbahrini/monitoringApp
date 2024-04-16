const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const SysClass = require("../../../models/SysClass");

const app = require("../../../server");
const fixture = require("./fixture.json");
chai.use(sinonChai);
let sysclass;

// delete  = patch
describe("DELETE sysclass", () => {
  before("Create user before deleting", (done) => {
    sysclass = new SysClass(fixture.sysClassTest);
    sysclass.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .delete("/api/sysclass/" + sysclass._id)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("libelle");
    expect(res.body.data).to.have.property("active");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(sysclass._id.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .delete("/api/sysclass/" + fixture.wrongId)
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Missing ID", async () => {
    const res = await request(app)
      .delete("/api/sysclass/")
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
  });
  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .delete("/api/sysclass/" + sysclass._id)
      .set("content-type", "application/json")
      .send({ libelle: "something" });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .delete("/api/sysclass/" + sysclass._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const findOneAndRemoveStub = sinon
      .stub(SysClass, "findOneAndRemove")
      .throws(new Error(""));
    const res = await request(app)
      .delete("/api/sysclass/" + sysclass._id)
      .set("content-type", "application/json");
    expect(findOneAndRemoveStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneAndRemoveStub.restore();
  });
});
