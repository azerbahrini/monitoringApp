const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../../server");
const fixture = require("./fixture.json");
const CustomerContact = require("../../../models/CustomerContact");
const System = require("../../../models/System");

chai.use(sinonChai);
let id;
let system;
let customerContact;
describe("Add Customer Contact To System", () => {
  before("adding Customer Contact before beginning the test", (done) => {
    system = new System({
      system: "systemName",
      type: "5fd1e65f93dd352dbcbf8cc6",
      category: "5fd1e65f93dd352dbcbf8cc6",
      class: "5fd1e65f93dd352dbcbf8cc6",
    });
    customerContact = new CustomerContact(
      fixture.customerContactDataTestWithoutID
    );
    system.save();
    customerContact.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .post("/api/customerContact/addToSystem/" + system._id)
      .set("content-type", "application/json")
      .send({ id: customerContact._id });
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("listHost");
    expect(res.body.data).to.have.property("system");
    expect(res.body.data).to.have.property("listCustomerContact");
  });

  it("Sends an invalid request - Empty Body", async () => {
    const res = await request(app)
      .post("/api/customerContact/addToSystem/" + system._id)
      .set("content-type", "application/json")
      .send(fixture.emptyCustomerContact);

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .post(
        "/api/customerContact/addToSystem/" + system._id + "params=something"
      )
      .set("content-type", "application/json")
      .send({ id: customerContact._id });
    expect(res.status).to.equal(400);
  });
  after((done) => {
    System.findByIdAndDelete(system._id);
    CustomerContact.findByIdAndDelete(customerContact._id).then(() => done());
  });
});
