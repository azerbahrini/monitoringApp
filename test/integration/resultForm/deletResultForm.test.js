const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const ResultForm = require("../../../models/ResultForm");
const app = require("../../../server");

chai.use(sinonChai);
let refsultForm;
describe("DELETE result form", () => {
  before("adding a result form before beginning the test", (done) => {
    refsultForm = refsultForm({
      formSchema: {
        test: "6189549b05812f2a68ef7aed",
      },
      formUISchema: {
        test: "6189549b05812f2a68ef7987",
      },
      formLimits: {
        test: "6189549b05812f2a68ef7123",
      },
      monitoringActivity: "6189549b05812f2a68ef7aed",
      isActive: true
    });
    ResultForm.save().then(() => done());
  });
  it("Sends a valid Request", async () => {
    const refsultFormId = refsultForm._id;
    const res = await request(app)
      .patch(`/api/resultform/deleteResultForm/${refsultFormId}`)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("isActive");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(refsultForm._id.toString());
  });

  it("Sends an Invalid request - non-existing systemId", async () => {
      const wrongID = "60ee0042d9b53b3e084209f6";
    const res = await request(app)
      .patch(`/api/resultform/deleteResultForm/${wrongID}`)
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
  });

  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .patch("/api/resultform/deleteResultForm/" + refsultForm._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .patch(`/api/resultform/deleteResultForm/${refsultForm._id}`)
      .set("content-type", "application/json")
      .send({ isActive: false });
    expect(res.status).to.equal(400);
  });

  it("Sends an invalid request - Wrong ID", async () => {
    it("Sends a valid Request", async () => {
      const res = await request(app)
        .patch("/api/resultform/deleteResultForm//111")
        .set("content-type", "application/json");
      expect(res.status).to.equal(400);
    });
  });

  after((done) => {
    ResultForm.findByIdAndDelete(refsultForm._id).then(() => done());
  });
});
