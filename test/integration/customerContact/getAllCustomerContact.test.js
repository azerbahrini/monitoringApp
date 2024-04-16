const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const request = require("supertest");

const expect = chai.expect;

const CustomerContact = require("../../../models/CustomerContact");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);

describe("GET ALL Customer Contact ", () => {
  before("adding Customer Contact before beginning the test", (done) => {
    cc = new CustomerContact(fixture.customerContactDataTestWithoutID);
    cc.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    let query = {
      page: 0,
      size: 1,
    };
    const res = await request(app)
      .get("/api/customerContact")
      .set("content-type", "application/json")
      .query(query);
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.include.property("docs");
    expect(res.body.data.docs).to.be.a("array");
    expect(res.body.data.docs[0]).to.have.property("mail");
    // expect(res.body.data.docs[0]).to.have.property("customer");
    expect(res.body.data.docs[0]).to.have.property("lastName");
    expect(res.body.data.docs[0]).to.have.property("phoneNumber");
    expect(res.body.data.docs[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - Wrong Route", async () => {
    const res = await request(app)
      .get("/api/customerContactt")
      .set("content-type", "application/json")
      .send(fixture.emptyCustomerContact);

    expect(res.status).to.equal(404);
  });

  it("Sends an invalid request - Body Validator Error", async () => {
    const res = await request(app)
      .get("/api/customerContact")
      .set("content-type", "application/json")
      .send({ type: fixture.customerContactDataTest.mail });

    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - Query Validator Error", async () => {
    const res = await request(app)
      .get("/api/customerContact?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  after(() => {
    CustomerContact.findByIdAndDelete(cc._id).then(() => done());
  });
});
