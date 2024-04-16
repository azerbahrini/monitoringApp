const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const request = require("supertest");

const expect = chai.expect;

const CustomerContact = require("../../../models/CustomerContact");
const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);

describe("GET ALL Customer Contact By Customer", () => {
  it("Sends a valid request", async () => {
    let query = {
      page: 0,
      size: 1,
    };
    const res = await request(app)
      .get("/api/customerContact/byCustomer/" + "608bde23c5a2a0a1607294a5")
      .set("content-type", "application/json")
      .query(query);
    expect(res.status).to.equal(200);
    expect(res.body.data.docs).to.be.a("array");
    expect(res.body.data.docs[0]).to.include.all.keys("lastName","mail");
    expect(res.body.data).to.be.a("object");
  });

  it("Sends an invalid request - Body Validator Error", async () => {
    const res = await request(app)
      .get("/api/customerContact/byCustomer/" + fixture.customerId)
      .set("content-type", "application/json")
      .send({ type: fixture.customerContactDataTest.mail });

    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - Query Validator Error", async () => {
    const res = await request(app)
      .get(
        "/api/customerContact/byCustomer/" +
          fixture.customerId +
          "params = something"
      )
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
});
