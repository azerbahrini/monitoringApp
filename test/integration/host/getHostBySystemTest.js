/* const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let Host = require("../../../models/Host");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let host;
describe("GET BY System", () => {
  before("adding Host before beginning the test", (done) => {
    host = new Host(fixture.hostDataTestWithoutID);
    host.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .get("/api/host/getBySystem/" + host.system)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("host");
    expect(res.body.data).to.have.property("isActive");
    expect(res.body.data._id).to.be.a("string");
    //expect(res.body.data.system).to.be.eq(host.system.toString());
    console.log(res.body.data);
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .get("/api/host/" + fixture.wrongID)
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
    expect(res.body.message).to.be.a("string");
  });
  it("Send an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .get("/api/host/" + host.system)
      .set("content-type", "application/json")
      .send({ libelle: "something" });
    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .get("/api/host/" + host.system + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const findOneStub = sinon.stub(Host, "findOne").throws(new Error(""));
    const res = await request(app)
      .get("/api/host/" + fixture.wrongID)
      .set("content-type", "application/json");
    expect(findOneStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneStub.restore();
  });
  after(() => {
    Host.findByIdAndDelete(host._id).then(() => done());
  });
});
 */