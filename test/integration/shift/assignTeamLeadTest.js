var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");
var shift = require("../../../models/Shift");
const app = require("../../../server");

chai.use(sinonChai);
let id1;
let id2;
describe("Assign Team Leader", () => {
  it("Sends a valid Request", async () => {
    const newTL = [
      {
        user: "60a31a01b3f8622968674f7e",
        name: "night shift",
        startDate: "2021-09-24T00:00:00.000Z",
        endDate: "2021-09-24T08:00:00.000Z",
      },
      {
        name: "night shift (2/2)",
        startDate: "2021-09-24T04:00:00.000Z",
        endDate: "2021-09-24T13:00:00.000Z",
        user: "60a319f4b3f8622968674f46",
      },
    ];
    const res = await request(app)
      .post("/api/shift/assignTeamLeader")
      .set("content-type", "application/json")
      .send(newTL);
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("array");
    //only required fileds in the model are expected but in this case we are adding role and type
    expect(res.body.data[0]).to.include.keys(
      "userMicrosoftId",
      "name",
      "startDate",
      "endDate",
      "updatedShiftAt",
      "role",
      "type"
    );
    id1 = res.body.data[0]._id;
    id2 = res.body.data[1]._id;
  });

  it("Sends an invalid request - empty body", async () => {
    const res = await request(app)
      .post("/api/shift/assignTeamLeader")
      .set("content-type", "application/json")
      .send();

    expect(res.status).to.equal(400);
  });
  it("Send an invalid request - wrong property", async () => {
    const res = await request(app)
      .post("/api/shift/assignTeamLeader")
      .set("content-type", "application/json")
      .send({ active: true });
    expect(res.status).to.equal(400);
  });
  after(() => {
    shift.findByIdAndDelete(id1)
    shift.findByIdAndDelete(id2).then(() => done());
  });
});
