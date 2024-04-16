const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Level = require("../../../models/Level");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let level;
describe("Add Level", () => {
  before("adding Level before beginning the test", (done) => {
    level = Level({ label: 3 });
    level.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .post("/api/level")
      .set("content-type", "application/json")
      .send(fixture.levelDataTestWithoutID);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("label");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - Empty Body", async () => {
    const res = await request(app)
      .post("/api/level")
      .set("content-type", "application/json")
      .send(fixture.emptyLevelDataTest);

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Missing Property", async () => {
    const res = await request(app)
      .post("/api/level")
      .set("content-type", "application/json")
      .send(fixture.emptyLevelDataTest);
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .post("/api/level?param=something")
      .set("content-type", "application/json")
      .send(fixture.levelDataTestWithoutID);
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const createStub = sinon.stub(Level, "create").throws(new Error(""));
    const res = await request(app)
      .post("/api/level")
      .set("content-type", "application/json")
      .send(fixture.levelDataTestWithoutID);
    expect(createStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    createStub.restore();
  });
  after((done) => {
    Level.findByIdAndDelete(level._id).then(() => done());
  });
});
