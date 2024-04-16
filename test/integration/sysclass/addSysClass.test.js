const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const sysClass = require("../../../models/SysClass");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let id;
describe("Add sysclass", () => {
  it("Sends a valid request", async () => {
    const res = await request(app)
      .post("/api/sysclass")
      .set("content-type", "application/json")
      .send(fixture.sysClassTest);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("libelle");
    expect(res.body.data).to.have.property("active");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - Empty Body", async () => {
    const res = await request(app)
      .post("/api/sysclass")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Missing Property", async () => {
    const res = await request(app)
      .post("/api/sysclass")
      .set("content-type", "application/json")
      .send({ active: fixture.sysClassTest.active });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .post("/api/sysclass?param=something")
      .set("content-type", "application/json")
      .send(fixture.sysClassTest);
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const createStub = sinon.stub(sysClass, "create").throws(new Error(""));
    const res = await request(app)
      .post("/api/sysclass")
      .set("content-type", "application/json")
      .send(fixture.sysClassTest);
    expect(createStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    createStub.restore();
  });
  after((done) => {
    sysClass.findByIdAndDelete(id).then(() => done());
  });
});
