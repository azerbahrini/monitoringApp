const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

const app = require("../../../server");
const System = require("../../../models/System");
const Customer = require("../../../models/Customer");
const fixture = require("./fixture2.json");

chai.use(sinonChai);
let id;
let system
describe("Add system", () => {
  it("Sends a valid Request", async () => {
    system = fixture.SystemDataTestWithoutID;
    const res = await request(app)
      .post("/api/system")
      .set("content-type", "application/json")
      .send(system);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object")
    expect(res.body.data).to.include.all.keys("name" ,"type","isActive","class");
    
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/system")
      .set("content-type", "application/json")
      .send(fixture.emptySytemDataTest);

    expect(res.status).to.equal(400);
  });

  it("Send an invalid request - missing property", async () => {
    const res = await request(app)
      .post("/api/system")
      .set("content-type", "application/json")
      .send({ isActive: true });
    expect(res.status).to.equal(400);
  });


  after((done) => {
    Customer.findByIdAndUpdate(
      {
        _id: system.customer,
      },
      { $pull: { listSystem: id } }
    ).then(System.findByIdAndDelete(id).then(() => done()));
  });
});
