const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let Type = require("../../../models/Type");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let type;
describe("GET BY ID Type", () => {
  before("adding Type before beginning the test", (done) => {
    type = new Type(fixture.typeDataTestWithoutID);
    type.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .get("/api/type/" + type._id)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("type");
    expect(res.body.data).to.have.property("active");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(type._id.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .get("/api/type/" + fixture.wrongID)
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
    expect(res.body.message).to.be.a("string");
  });
  it("Send an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .get("/api/type/" + type._id)
      .set("content-type", "application/json")
      .send({ libelle: "something" });
    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .get("/api/type/" + type._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const findOneStub = sinon.stub(Type, "findOne").throws(new Error(""));
    const res = await request(app)
      .get("/api/type/" + fixture.wrongID)
      .set("content-type", "application/json");
    expect(findOneStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneStub.restore();
  });
  after(() => {
    Type.findByIdAndDelete(type._id).then(() => done());
  });
});
