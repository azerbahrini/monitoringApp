const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
const Licence = require("../../../models/Licence");
const app = require("../../../server");

chai.use(sinonChai);
let licence;
describe("PUT licence", () => {
  before("adding a licence before beginning the test", (done) => {
    licence = Licence({
      startDate:"2021-12-02",
      endDate:"2023-12-02",
      customer:"608bde23c5a2a0a1607294a5"
    });  
    licence.save().then(() => done());
  });
  it("Sends a valid Request", (done) => {
    const licenceId = licence._id;
    request(app)
      .patch("/api/licence/update/" + licenceId.toString())
      .send({ 
        startDate:"2022-12-02",
      })
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("startDate");
        expect(res.body.data).to.have.property("endDate");
        expect(res.body.data).to.have.property("isActive");
        expect(res.body.data.startDate).to.have.lengthOf(24);
        expect(res.body.data.endDate).to.have.lengthOf(24);
        expect(res.body.data._id).to.be.a("string");
          expect(res.body.data._id).to.be.eq(licence._id.toString());
        done();
      })
      .catch((err) => done(err));
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const licenceWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .put("/api/licence/update/" + licenceWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });
  after((done) => {
    Licence.findByIdAndDelete(licence._id).then(() => done());
  });
});
