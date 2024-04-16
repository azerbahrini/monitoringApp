const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const request = require("supertest");

const expect = chai.expect;

const Level = require("../../../models/Level");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);

describe("GET ALL Level", () => {
  it("Sends a valid request", async () => {
    const res = await request(app)
      .get("/api/level")
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.include.property("docs")
    expect(res.body.data.docs).to.be.a("array");
    res.body.data.docs.forEach( doc => {
      expect(doc).to.have.property("label")
      expect(doc.label).to.be.a("string")
    })
  });

  it("Sends an invalid request - Wrong Route", async () => {
    const res = await request(app)
      .get("/api/levell")
      .set("content-type", "application/json")
      .send(fixture.emptyTypeDataTest);

    expect(res.status).to.equal(404);
  });

  it("Sends an invalid request - Body Validator Error", async () => {
    const res = await request(app)
      .get("/api/level")
      .set("content-type", "application/json")
      .send(fixture.levelDataTestWithoutID);

    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - Query Validator Error", async () => {
    const res = await request(app)
      .get("/api/level?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });

  it("Expect to throw an Internal Error", async () => {
    let findStub = sinon.stub(Level, "paginate").throws(new Error(""));
    const res = await request(app)
      .get("/api/level")
      .set("content-type", "application/json");
    expect(findStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findStub.restore();
  });
});
