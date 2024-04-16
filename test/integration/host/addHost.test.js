/* eslint-disable capitalized-comments */
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");
const app = require("../../../server");
const fixture = require("./fixture.json");
const Host = require("../../../models/Host");
chai.use(sinonChai);

var sandbox = sinon.createSandbox();
describe("Add host", () => {
  it("Sends a valid Request", (done) => {
    request(app)
      .post("/api/host")
      .set("content-type", "application/json")
      .send({
        host: "hostName",
        isActive: true,
        systemId: "610903550f30c3d041e7e7dc",
      })
      .then((res) => {
        
        done();
      })
      .catch((err) => done(err));
  });

  it("Sends an invalid request - Body Validator Error", async () => {
    const res = await request(app)
      .post("/api/host")
      .set("content-type", "application/json")
      .send(fixture.emptyHostDataTest);
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Missing Property", async () => {
    const res = await request(app)
      .post("/api/host")
      .set("content-type", "application/json")
      .send({ isActive: fixture.hostDataTestWithoutID.isActive });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validator Error", async () => {
    const res = await request(app)
      .post("/api/host?param=something")
      .set("content-type", "application/json")
      .send(fixture.hostDataTest);
    expect(res.status).to.equal(400);
  });
  // it("Expect to throw an Internal Error", async () => {
  //   const createStub = sinon.stub(Host, "create").throws(new Error(""));
  //   const res = await request(app)
  //     .post("/api/host")
  //     .set("content-type", "application/json")
  //     .send({ ...fixture.hostDataTestWithoutID, ...fixture.systemId });
  //   expect(createStub).to.be.calledOnce;
  //   expect(res.status).to.equal(400);
  //   createStub.restore();
  // });
});
