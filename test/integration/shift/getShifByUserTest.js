var chai = require("chai");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var request = require("supertest");
const app = require("../../../server");
const Shift = require("../../../models/Shift");
const { query } = require("express-validator");
//const app = express();

//app.use("/", routes);

chai.use(sinonChai);
let shift;
describe("GET Shift By User", () => {
    let startDate = new Date();
    let endDate = new Date();
  before("adding Shift before beginning the test", (done) => {
    shift = Shift({
      role: "5fa02d8f785e4681ddfa3a6d",
      shiftId: null,
      userMicrosoftId: "fc90c6b4-a54f-44e5-b530-c787225000d9",
      name: "shift",
      startDate: startDate.setHours(startDate.getHours() - 4),
      endDate: endDate.setHours(endDate.getHours() + 4),
      updatedShiftAt: "2021-09-24T00:00:00.000+00:00",
      user: "614d1859663a802bc804a88d",
      type: "shift",
      reference:
        "SHFT_4d8178d0-69eb-4cf6-add9-6018b670aed2614d1859663a802bc804a88d",
    });
    shift.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    let user_ID= "614d1859663a802bc804a88d";
    const res = await request(app)
      .get("/api/shift/getshiftByUser/" + user_ID)
      .set("content-type", "application/json")
      .query(query);
    expect(res.status).to.equal(200);
    expect(res.body).to.include.property("data");
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("name");
    expect(res.body.data).to.have.property("startDate");
    expect(res.body.data).to.have.property("endDate");
    expect(res.body.data).to.have.property("user");
    expect(res.body.data._id).to.be.a("string");
  });
    it("Sends an invalid request - wrong route", async () => {
      const res = await request(app)
        .get("/api/shift/getshiftByUser/test")
      expect(res.status).to.equal(400);
    });
    it("Sends an invalid request - No Exist shift with this criteria User ID", async () => {
        let user_ID = "613f2534ff1edbbe626636c3";
        const res = await request(app).get(
          `/api/shift/getshiftByUser/${user_ID}`
        );
        expect(res.status).to.equal(204);
      });
  after(() => {
    Shift.findByIdAndDelete(shift._id).then(() => done());
  });
});
