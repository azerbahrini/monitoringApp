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
describe("PATCH sysclass", () => {
  before("adding a sysclass before beginning the test", (done) => {
    sysclass = SysClass(fixture.sysClassTest);
    sysclass.save().then(() => done());
  });
  it("Sends a valid request", (done) => {
    sysclass._id;

    request(app)
      .patch("/api/sysclass/" + sysclass._id.toString())
      .send({ libelle: fixture.sysClassTest.libelle })
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("libelle");
        expect(res.body.data).to.have.property("active");
        expect(res.body.data._id).to.be.a("string");
        expect(res.body.data._id).to.be.eq(sysclass._id.toString());
        done();
      })
      .catch((err) => done(err));
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .patch("/api/sysclass/" + fixture.wrongId)
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
      .patch("/api/sysclass/" + sysclass._id)
      .set("content-type", "application/json")
      .send({ libelle: true });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .patch("/api/sysclass/" + sysclass._id + "?param=something")
      .set("content-type", "application/json")
      .send({ libelle: fixture.sysClassTest.libelle });
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const findOneAndUpdateStub = sinon
      .stub(SysClass, "findOneAndUpdate")
      .throws(new Error(""));
    const res = await request(app)
      .patch("/api/sysclass/" + fixture.wrongId)
      .set("content-type", "application/json");
    expect(findOneAndUpdateStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneAndUpdateStub.restore();
  });
  after((done) => {
    SysClass.findByIdAndDelete(sysclass._id).then(() => done());
  });
});
