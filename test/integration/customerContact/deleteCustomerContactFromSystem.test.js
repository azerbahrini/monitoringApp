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
describe("Delete Customer Contact From System", () => {
  before("adding Customer Contact before beginning the test", (done) => {
    customerContact = new CustomerContact(
      fixture.customerContactDataTestWithoutID
    );
    customerContact.save();
    system = new System({
      name: "systemName",
      type: "5fd1e65f93dd352dbcbf8cc6",
      category: "5fd1e65f93dd352dbcbf8cc6",
      class: "5fd1e65f93dd352dbcbf8cc6",
      customer: "5fd1e65f93dd352dbcbf8cc6",
      listCustomerContact: [customerContact._id],
      isActive: true,
    });
    system.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .patch(
        `/api/customerContact/deleteFromSystem/${system._id}/customerContact/${customerContact._id}`
      )
      .set("content-type", "application/json");

    expect(res.status).to.equal(201);

    expect(res.body.data).to.include.all.keys(
      "name",
      "type",
      "category",
      "class",
      "customer"
    );
  });

  it("Sends an invalid request - Empty Param", async () => {
    const res = await request(app)
      .patch(
        `/api/customerContact/deleteFromSystem/${system._id}/customerContact/`
      )
      .set("content-type", "application/json");

    expect(res.status).to.equal(404);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .patch(
        `/api/customerContact/deleteFromSystem/${system._id}/customerContact/${customerContact._id}/paramsSomething`
      )
      .set("content-type", "application/json");

    expect(res.status).to.equal(404);
  });
  after((done) => {
    System.findByIdAndDelete(system._id);
    CustomerContact.findByIdAndDelete(customerContact._id).then(() => done());
  });
});
