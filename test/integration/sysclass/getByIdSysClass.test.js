const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let SysClass = require("../../../models/SysClass");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let sysclass;
describe("GET BY ID sysclass", () => {
  before("adding sysclass before beginning the test", (done) => {
    sysclass = new SysClass(fixture.sysClassTest);
    sysclass.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .get("/api/sysclass/" + sysclass._id)
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
      .get("/api/sysclass/" + fixture.wrongId)
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
    expect(res.body.message).to.be.a("string");
    expect(res.body.message).to.be.eq("system class not found");
  });
  it("Send an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .get("/api/sysclass/" + sysclass._id)
      .set("content-type", "application/json")
      .send({ libelle: "something" });
    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .get("/api/sysclass/" + sysclass._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const findOneStub = sinon.stub(SysClass, "findOne").throws(new Error(""));
    const res = await request(app)
      .get("/api/sysclass/" + fixture.wrongId)
      .set("content-type", "application/json");
    expect(findOneStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneStub.restore();
  });
  after(() => {
    SysClass.findByIdAndDelete(sysclass._id).then(() => done());
  });
});
