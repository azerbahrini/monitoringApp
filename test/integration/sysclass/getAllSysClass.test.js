const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const request = require("supertest");

const expect = chai.expect;
const assert = chai.assert;

const SysClass = require("../../../models/SysClass");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let sysclass;
describe("GET ALL sysclass", () => {
  before("adding host before beginning the test", (done) => {
    sysclass = SysClass({ libelle: "sysclas test", active: false });
    sysclass.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    let query = {
      page : 0,
      size : 1
    }
    const res = await request(app)
      .get("/api/sysclass")
      .set("content-type", "application/json")
      .query(query);
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("docs");
    expect(res.body.data.docs).to.be.a("array");
    expect(res.body.data.docs[0]).to.have.property("libelle");
    expect(res.body.data.docs[0]).to.have.property("active");
    expect(res.body.data.docs[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - Wrong Route", async () => {
    const res = await request(app)
      .get("/api/sysclasss")
      .set("content-type", "application/json")
      .send(fixture.emptyObject);

    expect(res.status).to.equal(404);
  });

  it("Sends an invalid request - Body Validator Error", async () => {
    const res = await request(app)
      .get("/api/sysclass")
      .set("content-type", "application/json")
      .send({ libelle: fixture.sysClassTest.libelle });

    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - Query Validator Error", async () => {
    const res = await request(app)
      .get("/api/sysclass?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });

  it("Expect to throw an Internal Error", async () => {
    let findStub = sinon.stub(SysClass, "paginate").throws(new Error(""));
    const res = await request(app)
      .get("/api/sysclass")
      .set("content-type", "application/json");
    expect(findStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findStub.restore();
  });
  after(() => {
    SysClass.findByIdAndDelete(sysclass._id).then(() => done());
  });
});
