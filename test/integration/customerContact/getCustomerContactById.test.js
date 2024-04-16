const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let CustomerContact = require("../../../models/CustomerContact");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);
let cc;
describe("GET BY ID Customer Contact", () => {
  before("adding Customer Contact before beginning the test", (done) => {
    cc = new CustomerContact(fixture.customerContactDataTestWithoutID);
    cc.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .get("/api/customerContact/" + cc._id)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("mail");
    expect(res.body.data).to.have.property("lastName");
    expect(res.body.data).to.have.property("phoneNumber");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(cc._id.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .get("/api/customerContact/" + fixture.WrongID)
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
    expect(res.body.message).to.be.a("string");
  });
  it("Send an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .get("/api/customerContact/" + cc._id)
      .set("content-type", "application/json")
      .send({ mail: fixture.customerContactDataTestWithoutID.mail });
    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .get("/api/customerContact/" + cc._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const findOneStub = sinon
      .stub(CustomerContact, "findOne")
      .throws(new Error(""));
    const res = await request(app)
      .get("/api/customerContact/" + fixture.wrongID)
      .set("content-type", "application/json");
    expect(findOneStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneStub.restore();
  });
  after(() => {
    CustomerContact.findByIdAndDelete(cc._id).then(() => done());
  });
});
