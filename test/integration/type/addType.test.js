const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Type = require("../../../models/Type");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let type;
describe("Add Type", () => {
  before("adding host before beginning the test", (done) => {
    type = Type({ type: "Type test", isActive: true });
    type.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .post("/api/type")
      .set("content-type", "application/json")
      .send(fixture.typeDataTestWithoutID);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("type");
    expect(res.body.data).to.have.property("active");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - Empty Body", async () => {
    const res = await request(app)
      .post("/api/type")
      .set("content-type", "application/json")
      .send(fixture.emptyTypeDataTest);

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Missing Property", async () => {
    const res = await request(app)
      .post("/api/type")
      .set("content-type", "application/json")
      .send({ isActive: fixture.typeDataTestWithoutID.active });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .post("/api/type?param=something")
      .set("content-type", "application/json")
      .send(fixture.typeDataTestWithoutID);
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const createStub = sinon.stub(Type, "create").throws(new Error(""));
    const res = await request(app)
      .post("/api/type")
      .set("content-type", "application/json")
      .send(fixture.typeDataTestWithoutID);
    expect(createStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    createStub.restore();
  });
  after((done) => {
    Type.findByIdAndDelete(type._id).then(() => done());
  });
});
