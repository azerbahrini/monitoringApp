const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const ItOperation = require("../../../models/ItOperation");
const app = require("../../../server");

chai.use(sinonChai);
let id;
describe("Add ItOperation", () => {
  it("Sends a valid Request", async () => {
    const itOperation = {
      "title":"ITop test3",
      "description":"hour",
      "timeZone":"6109b0cd940d6406e8973644",
      "startDate":"2021-12-02T15:30",
       "endDate":"2021-12-02T15:30",
      "spoc":"60a31a15b3f8622968674fd4",
      "system":"609bcf0f7ebdc50c64746043",
      "type":"planned",
      "ticket":"a8"
    };
    const res = await request(app)
      .post("/api/ItOperation?sendMail=true")
      .set("content-type", "application/json")
      .send(itOperation);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("title");
    expect(res.body.data).to.have.property("description");
    expect(res.body.data).to.have.property("startDate");
    expect(res.body.data).to.have.property("endDate");
    expect(res.body.data).to.have.property("endDate");
    expect(res.body.data).to.have.property("system");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Send an invalid request - missing query", async () => {
    const itOperation = {
      "title":"ITop test3",
      "description":"hour",
      "timeZone":"6109b0cd940d6406e8973644",
      "startDate":"2021-12-02T15:30",
       "endDate":"2021-12-02T15:30",
      "spoc":"60a31a15b3f8622968674fd4",
      "system":"609bcf0f7ebdc50c64746043",
      "type":"planned",
      "ticket":"a8"
    };
    const res = await request(app)
      .post("/api/ItOperation")
      .set("content-type", "application/json")
      .send(itOperation);
    expect(res.status).to.equal(400);
  });
  
  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/ItOperation")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - missing property", async () => {
    const res = await request(app)
      .post("/api/ItOperation")
      .set("content-type", "application/json")
      .send({ title: "test IT" });
    expect(res.status).to.equal(400);
  });
  after((done) => {
    ItOperation.findByIdAndDelete(id).then(() => done());
  });
});
