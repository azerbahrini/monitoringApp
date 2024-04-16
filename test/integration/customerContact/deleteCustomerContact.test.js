const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const CustomerContact = require("../../../models/CustomerContact");

const app = require("../../../server");
const fixture = require("./fixture.json");
chai.use(sinonChai);
let cc;

// delete  = patch
describe("DELETE Customer Contact", () => {
  before("Create user before deleting", (done) => {
    cc = new CustomerContact({
      ...fixture.customerContactDataTestWithoutID,
      customer: fixture.customerId,
    });
    cc.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .patch("/api/customerContact/delete/" + cc._id)
      .set("content-type", "application/json");
    expect(res.status).to.equal(201);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("mail");
    expect(res.body.data).to.have.property("phoneNumber");
    expect(res.body.data).to.have.property("lastName");
    expect(res.body.data).to.have.property("customer");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(cc._id.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .patch("/api/customerContact/delete/" + fixture.WrongID)
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
  });
  it("Sends an invalid request - Missing ID", async () => {
    const res = await request(app)
      .patch("/api/customerContact/delete/")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  /* it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch("/api/customerContact/delete/" + cc._id)
      .set("content-type", "application/json")
      .send({ libelle: "something" });
    expect(res.status).to.equal(400);
  }); */
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .patch("/api/customerContact/delete/" + cc._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  // it("Expect to throw an Internal Error", async () => {
  //   const findOneAndRemoveStub = sinon
  //     .stub(CustomerContact, "findOneAndRemove")
  //     .throws(new Error(""));
  //   const res = await request(app)
  //     .delete("/api/customerContact/" + cc._id)
  //     .set("content-type", "application/json");
  //   expect(findOneAndRemoveStub).to.be.calledOnce;
  //   expect(res.status).to.equal(400);
  //   findOneAndRemoveStub.restore();
  // });
});
