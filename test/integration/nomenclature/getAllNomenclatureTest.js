const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const request = require("supertest");

const expect = chai.expect;

const Nomenclature = require("../../../models/Nomenclature");
const app = require("../../../server");

chai.use(sinonChai);
let nomenclature;
describe("GET ALL nomenclature", () => {
  before("adding nomenclature before beginning the test", (done) => {
    nomenclature = Nomenclature({
        name: "Test shift"
    }
    );
    nomenclature.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .get("/api/nomenclature")
      .set("content-type", "application/json")
      .query();
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("array");
    expect(res.body.data[0]).to.have.property("name");
    expect(res.body.data[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - Wrong Route", async () => {
    const res = await request(app)
      .get("/api/nomenclature/test")
      .set("content-type", "application/json");
     

    expect(res.status).to.equal(404);
  });

  it("Sends an invalid request - Query Validator Error", async () => {
    const res = await request(app)
      .get("/api/nomenclature?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });

  it("Expect to throw an Internal Error", async () => {
    let findStub = sinon.stub(Nomenclature, "find").throws(new Error(""));
    const res = await request(app)
      .get("/api/nomenclature")
      .set("content-type", "application/json");
    expect(findStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findStub.restore();
  });
  after(() => {
    Nomenclature.findByIdAndDelete(nomenclature._id).then(() => done());
  });
});
