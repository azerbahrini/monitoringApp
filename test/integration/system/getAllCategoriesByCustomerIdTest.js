var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

const app = require("../../../server");
const System = require("../../../models/System");
const Category = require("../../../models/Category");
chai.use(sinonChai);
let system;
describe("GET ALL categories by Customer", () => {
  before("adding System before beginning the test", (done) => {
    category = Category({
      category: "sap",
      isActive: true,
    });
    category.save();

    system = System({
      name: "Name",
      type: "608be0f0c5a2a0bd397294aa",
      category: category._id,
      customer: "608bde23c5a2a0a1607294a5",
      deployType: "Cloud",
      deployDesc: "Cloud",
      fqdn: "fqdn",
      class: "610d502489e61a36e88e1d27",
      listTechnicalUser: [
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
      ],
      listCustomerContact: [
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
        "610d502489e61a36e88e1d27",
      ],
      isActive: true,
    });
    system.save().then(() => done());
  });

  it("Sends a valid Request", async () => {
    const customer_Id = system.customer;
    const res = await request(app)
      .get("/api/system/SystemsCategoriesByCustomer/" + customer_Id)
      .set("content-type", "application/json");

    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("Array");
    expect(res.body.data[0]).to.have.property("category");
    expect(res.body.data[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/system/SystemsCategoriesByCustomer/test")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - No Customer ID", async () => {
    const res = await request(app).get(
      "/api/system/SystemsCategoriesByCustomer"
    );
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - No Exist Customer ID", async () => {
    let customer_Id = "610d502489e61a36e88e1d27";
    const res = await request(app).get(
      `/api/system/SystemsCategoriesByCustomer/${customer_Id}`
    );

    expect(res.status).to.equal(404);
  });

  after(() => {
    System.findByIdAndDelete(system._id).then(() => done());
    Category.findByIdAndDelete(category._id).then(() => done());
  });
});
