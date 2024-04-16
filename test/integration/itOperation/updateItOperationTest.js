const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");
const ItOperation = require("../../../models/ItOperation");
const app = require("../../../server");

chai.use(sinonChai);
let itOperation;

describe("Update itOperation", () => {
  before("adding a itOperation before beginning the test", (done) => {
    itOperation = ItOperation({
        "title":"ITop test3",
        "description":"hour",
        "timeZone":"6109b0cd940d6406e8973644",
        "startDate":"2021-12-02T15:30",
         "endDate":"2021-12-02T15:30",
        "spoc":"60a31a15b3f8622968674fd4",
        "system":"609bcf0f7ebdc50c64746043",
        "type":"planned",
        "ticket":"a8"
      });  
    itOperation.save().then(() => done());
  });
  it("Sends a valid Request", (done) => {
    const itOperationId = itOperation._id;
    request(app)
      .patch("/api/itOperation/update/" + itOperationId.toString()+"?sendMail=false&change=updated")
      .send({
        description:"change description 1.6"
      })
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a("object");
        expect(res.body.data).to.have.property("title");
        expect(res.body.data).to.have.property("description");
        expect(res.body.data).to.have.property("startDate");
        expect(res.body.data).to.have.property("endDate");
        expect(res.body.data).to.have.property("endDate");
        expect(res.body.data).to.have.property("system");
        expect(res.body.data._id).to.be.a("string");
        expect(res.body.data._id).to.be.eq(itOperation._id.toString());
        done();
      })
      .catch((err) => done(err));
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const itOperationWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .put("/api/itOperation/update/" + itOperationWrongId +"?sendMail=false&change=postponed")
        .send({
          description:"change description 1.6"
        })
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });

  it("Sends an invalid request - missing query", async () => {
    it("Sends a valid Request", async () => {
      const itOperationWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .put("/api/itOperation/update/" + itOperationWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });
  after((done) => {
    ItOperation.findByIdAndDelete(itOperation._id).then(() => done());
  });
});
