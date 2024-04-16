const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../../server");
const fixture = require("./fixture.json");
const CustomerContact = require("../../../models/CustomerContact");

chai.use(sinonChai);
let id;
describe("Add Customer Contact", () => {
  it("Sends a valid request", async () => {
    const res = await request(app)
      .post("/api/customerContact")
      .set("content-type", "application/json")
      .send(fixture.customerContactDataTestWithoutID);
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("lastName");
    expect(res.body.data).to.have.property("mail");
    expect(res.body.data._id).to.be.a("string");
    id = res.body.data._id.toString();
  });

  it("Sends an invalid request - Empty Body", async () => {
    const res = await request(app)
      .post("/api/customerContact")
      .set("content-type", "application/json")
      .send(fixture.emptyCustomerContact);

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Missing Property", async () => {
    const res = await request(app)
      .post("/api/customerContact")
      .set("content-type", "application/json")
      .send({ mail: fixture.customerContactDataTestWithoutID.mail });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .post("/api/customerContact?param=something")
      .set("content-type", "application/json")
      .send(fixture.customerContactDataTestWithoutID);
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const createStub = sinon
      .stub(CustomerContact, "create")
      .throws(new Error(""));
    const res = await request(app)
      .post("/api/customerContact")
      .set("content-type", "application/json")
      .send(fixture.customerContactDataTestWithoutID);
    expect(createStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    createStub.restore();
  });
  after((done) => {
    CustomerContact.findByIdAndDelete(id).then(() => done());
  });
});
