const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
let Licence = require("../../../models/Licence");
const app = require("../../../server");
const { query } = require("express-validator");

chai.use(sinonChai);
let licence;
const customerId = "608bde23c5a2a0a1607294a5";
describe("GET BY Customer licence", () => {
  before("adding licence before beginning the test", (done) => {
    licence = Licence({
      startDate: "2021-12-02",
      endDate: "2023-12-02",
      customer: customerId,
    });
    licence.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    let query = {
      page: 0,
      size: 30,
    };
    const res = await request(app)
      .get("/api/licence/getbycustomer/" + customerId)
      .set("content-type", "application/json")
      .query(query);
    expect(res.status).to.equal(200);
    expect(res.body.data.docs).to.be.a("array");
    expect(res.body.data.docs[0]).to.include.all.keys(
      "startDate",
      "endDate",
      "_id",
      "isActive",
      "customer"
    );
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/licences")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(404);
  });
  after(() => {
    Licence.findByIdAndDelete(licence._id).then(() => done());
  });
});
