const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Client = require("../../../models/Client");
const app = require("../../../server");
const System = require("../../../models/System");
const fixture = require("./fixture.json");

chai.use(sinonChai);
const sysId = "61269e382d616e9a1f6b8ca1";
let id;
describe("Add client", () => {
  it("Sends a valid Request", async () => {
    const client = fixture.clientDataTestWithoutID;
    const res = await request(app)
      .post("/api/client")
      .set("content-type", "application/json")
      .send({ 
        clientNumber:100,
        isActive:true,
        system : "609bcf0f7ebdc50c64746043"
    });
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("clientNumber");
    expect(res.body.data).to.have.property("isActive");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/client")
      .set("content-type", "application/json")
      .send(fixture.emptyClientDataTest);

    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - missing property", async () => {
    const res = await request(app)
      .post("/api/client")
      .set("content-type", "application/json")
      .send({ isActive: true });
    expect(res.status).to.equal(400);
  });
  after((done) => {
    System.findByIdAndUpdate(
      {
        _id: sysId,
      },
      { $pull: { listClient: id } }
    ).then(Client.findByIdAndDelete(id).then(() => done()));
  });
});
