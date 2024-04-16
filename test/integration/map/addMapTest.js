const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const map = require("../../../models/MonitoringActivityPlannification");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let id;
describe("Add Map", () => {
  it("Sends a valid request", async () => {
    const res = await request(app)
      .post("/api/map")
      .set("content-type", "application/json")
      .send(fixture.mapTest);
      
    expect(res.status).to.equal(201);
    
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("periodicity");
    expect(res.body.data).to.have.property("active");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - Empty Body", async () => {
    const res = await request(app)
      .post("/api/map")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Missing Property", async () => {
    const res = await request(app)
      .post("/api/map")
      .set("content-type", "application/json")
      .send({ active: fixture.mapTest.active });
    expect(res.status).to.equal(400);
  });
  
  it("Expect to throw an Internal Error", async () => {
    const createStub = sinon.stub(map, "create").throws(new Error(""));
    const res = await request(app)
      .post("/api/map")
      .set("content-type", "application/json")
      .send(fixture.mapTest);
    expect(createStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    createStub.restore();
  });
  after((done) => {
    map.findByIdAndDelete(id).then(() => done());
  });
});
