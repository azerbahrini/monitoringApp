var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");

const app = require("../../../server");
const System = require("../../../models/System");
const Type = require("../../../models/Type");
chai.use(sinonChai);
let system;
describe("GET ALL types by Customer and Category", () => {
  before("adding System before beginning the test", (done) => {
    type = Type({
      type: "PRD",
      active: true,
    });
    type.save();
    system = System({
      name: "Name",
      type: type._id,
      category: "608be4b7c5a2a005c87294b1",
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
    const category_Id = system.category;
    const res = await request(app)
      .get(
        `/api/system/systemTypes/customer/${customer_Id}/category/${category_Id}`
      )
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("Array");
    expect(res.body.data[0]).to.have.property("type");
    expect(res.body.data[0]._id).to.be.a("string");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/system/systemTypes/customer/test/category/test")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - No Customer ID", async () => {
    let category_Id = "608be4b7c5a2a005c87294b1";
    const res = await request(app).get(
      `/api/system/systemTypes/customer/${null}/category/${category_Id}`
    );
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - No Exist Customer ID", async () => {
    let customer_Id = "610d502489e61a36e88e1d27";
    let category_Id = "608be4b7c5a2a005c87294b1";
    const res = await request(app).get(
      `/api/system/systemTypes/customer/${customer_Id}/category/${category_Id}`
    );

    expect(res.status).to.equal(404);
  });
  it("Sends an invalid request - No Exist category ID", async () => {
    let category_Id = "610d502489e61a36e88e1d27";
    let customer_Id = "608bde23c5a2a0a1607294a5";
    const res = await request(app).get(
      `/api/system/systemTypes/customer/${customer_Id}/category/${category_Id}`
    );

    expect(res.status).to.equal(404);
  });

  after(() => {
    System.findByIdAndDelete(system._id).then(() => done());
    Type.findByIdAndDelete(type._id).then(() => done());
  });
});
