const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");

let express = require("express");

const app = require("../../../server");
let ItOperation = require("../../../models/ItOperation");

chai.use(sinonChai);
let itOperation;
describe("GET ALL Active itOperation", () => {
  before("adding itOperation before beginning the test", (done) => {
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
  it("Sends a valid Request", async () => {
    const res = await request(app)
      .get("/api/itOperation/getAllactive?page=0&size=3&sort=1")
      .set("content-type", "application/json");
      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.property("totalDocs");
      expect(res.body.data).to.have.property("totalPages");
      expect(res.body.data).to.have.property("docs");
      expect(res.body.data.docs).to.be.a('array');
                    res.body.data.docs.forEach(itOperation => {
                    // expect(itOperation).to.have.property('listModule');
                    // expect(itOperation).to.have.property('_id');
                    expect(itOperation).to.include.keys('title','description','_id','startDate','endDate');
                    });
  });

  it("Send an invalid request - missing query", async () => {
    const res = await request(app)
      .get("/api/itOperation/getAllactive")
      .set("content-type", "application/json")
    expect(res.status).to.equal(400);
  });
  after(() => {
    ItOperation.findByIdAndDelete(itOperation._id).then(() => done());
  });
});
