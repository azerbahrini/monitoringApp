/* eslint-disable capitalized-comments */
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");
const System = require("../../../models/System");

const app = require("../../../server");
const fixture = require("./fixture.json");

chai.use(sinonChai);

let system;
describe("Add System Contact", () => {
  before("create a system before test", (done) => {
    system = new System(fixture.SystemDataTestWithoutID);
    system.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
    
      .patch(`/api/system/addContact/${system._id}`)
      .set("content-type", "application/json")
      .send({"listCustomerContact" : ["611f8e24b7123928c0e6dfff"]});
    expect(res.status).to.equal(201);
    

  });

  it("Sends an Invalid reequest - non-existing SystemId", async () => {
    const res = await request(app)
      .patch(`/api/system/addContact/${fixture.wrongID}`)
      .set("content-type", "application/json")
      .send({"listCustomerContact" : ["611f8e24b7123928c0e6dfff"]});
    expect(res.status).to.equal(404);
  });

  it("Error in Try - invalid  id", async () => {
    const res = await request(app)
      .patch(`/api/system/addContact/${"611f8e24b7123928c0e6dfff445512121"}`)
      .set("content-type", "application/json")
      .send({"listCustomerContact" : ["611f8e24b7123928c0e6dfff"]});
    expect(res.status).to.equal(400);
  });


  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch(`/api/system/addContact/${system._id}`)
      .set("content-type", "application/json")
      .send({test: "ok" });
    expect(res.status).to.equal(400);
  });
  after((done) => {
    System.findByIdAndDelete(system._id).then(() => done());
  });
});
