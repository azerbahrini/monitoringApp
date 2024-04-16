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
describe("PATCH Type", () => {
  before("adding a Type before beginning the test", (done) => {
    type = Type({ ...fixture.typeDataTestWithoutID });
    type.save().then(() => done());
  });
  it("Sends a valid request", (done) => {
    request(app)
      .patch("/api/type/" + type._id)
      .send(fixture.typeDataTestWithoutID)
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("type");
        expect(res.body.data).to.have.property("active");
        expect(res.body.data._id).to.be.a("string");
        expect(res.body.data._id).to.be.eq(type._id.toString());
        done();
      })
      .catch((err) => done(err));
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .patch("/api/type/" + fixture.wrongID)
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
  });
  // it("Sends an invalid request - no ID", async () => {
  //   const sysClasseWrongId = "60ef4e3f7221301cc8eaafbe";
  //   const res = await request(app)
  //     .patch("/api/sysclass/")
  //     .set("content-type", "application/json")
  //   expect(res.status).to.equal(404);
  // });
  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch("/api/type/" + type._id)
      .set("content-type", "application/json")
      .send({ type: true });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .patch("/api/type/" + type._id + "?param=something")
      .set("content-type", "application/json")
      .send({ type: fixture.typeDataTestWithoutID.type });
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const findOneAndUpdateStub = sinon
      .stub(Type, "findOneAndUpdate")
      .throws(new Error(""));
    const res = await request(app)
      .patch("/api/type/" + fixture.wrongID)
      .set("content-type", "application/json");
    expect(findOneAndUpdateStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneAndUpdateStub.restore();
  });
  after((done) => {
    Type.findByIdAndDelete(type._id).then(() => done());
  });
});
