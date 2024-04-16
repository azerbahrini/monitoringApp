const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let CustomerContact = require("../../../models/CustomerContact");
let System = require("../../../models/System");
const app = require("../../../server");
const fixture = require("./fixture.json");
const systemFixture = require("./fixtureSystem.json");

chai.use(sinonChai);
let cc;
describe("GET Unssigned Customer Contacts", () => {
  before("adding Customer Contact before beginning the test", (done) => {
    cc = new CustomerContact(fixture.customerContactDataTestWithoutID);
    sys = new System(systemFixture.SystemDataTest);

    cc.save();
    sys.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .get(
        `/api/customerContact/UnAssignedCustomerContact/customer/${sys.customer}/system/${sys._id}`
      )
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("array");
    expect(res.body.data[0]).to.have.property("mail");
    expect(res.body.data[0]).to.have.property("lastName");
    expect(res.body.data[0]).to.have.property("phoneNumber");
    expect(res.body.data[0]._id).to.be.a("string");
  });
  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get(
        `/api/customerContact/UnAssignedCustomerContac/customer/${sys.customer}/system/${sys._id}`
      )
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .get(
        `/api/customerContact/UnAssignedCustomerContact/customer/test
        /system/test`
      )
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
    expect(res.body.message).to.be.a("string");
  });

  after(() => {
    CustomerContact.findByIdAndDelete(cc._id).then(() => done());
    System.findByIdAndDelete(sys._id).then(() => done());
  });
});
