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
describe("PATCH Customer Contact", () => {
  before("adding a CustomerContact before beginning the test", (done) => {
    cc = CustomerContact({ ...fixture.customerContactDataTestWithoutID });
    cc.save().then(() => done());
  });
  it("Sends a valid request", (done) => {
    request(app)
      .patch("/api/customerContact/" + cc._id)
      .send(fixture.customerContactDataTestWithoutID)
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("mail");
        expect(res.body.data).to.have.property("lastName");
        expect(res.body.data).to.have.property("phoneNumber");
        expect(res.body.data._id).to.be.a("string");
        expect(res.body.data._id).to.be.eq(cc._id.toString());
        done();
      })
      .catch((err) => done(err));
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .patch("/api/customerContact/" + fixture.WrongID)
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
  });
  // it("Sends an invalid request - no ID", async () => {
  //   const sysClasseWrongId = "60ef4e3f7221301cc8eaafbe";
  //   const res = await request(app)
  //     .patch("/api/sysclass/")
  //     .set("content-type", "application/json")
  //   expect(res.status).to.equal(404);
  // });
  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch("/api/customerContact/" + cc._id)
      .set("content-type", "application/json")
      .send({ type: "type" });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .patch("/api/customerContact/" + cc._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const findOneAndUpdateStub = sinon
      .stub(CustomerContact, "findOneAndUpdate")
      .throws(new Error(""));
    const res = await request(app)
      .patch("/api/customerContact/" + fixture.wrongID)
      .set("content-type", "application/json");
    expect(findOneAndUpdateStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneAndUpdateStub.restore();
  });
  after((done) => {
    CustomerContact.findByIdAndDelete(cc._id).then(() => done());
  });
});
