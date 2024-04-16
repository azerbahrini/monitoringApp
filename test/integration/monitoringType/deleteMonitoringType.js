const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const MonitoringType = require("../../../models/MonitoringType");
const app = require("../../../server");

chai.use(sinonChai);
let mType;

// delete  = patch
describe("DELETE Monitoring type", () => {
  before("Create user before deleting", (done) => {
    mType = MonitoringType({ libelle: "test update", isActive: true });
    mType.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const mTypeId = mType._id;
    const res = await request(app)
      .delete("/api/monitoringType/delete/" + mTypeId)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("libelle");
    expect(res.body.data).to.have.property("isActive");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(mType._id.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const mTypeWrongId = "60ef4e3f7221301cc8eaafbe";
      const res = await request(app)
        .patch("/api/monitoringType/delete/" + mTypeWrongId)
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });

  after((done) => {
    MonitoringType.findByIdAndDelete(mType._id).then(() => done());
  });
});
