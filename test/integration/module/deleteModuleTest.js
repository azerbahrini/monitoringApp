const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
const Module = require("../../../models/Module");

const app = require("../../../server");
chai.use(sinonChai);
let moduleTest;

// delete  = patch
describe("DELETE module", () => {
  before("Create user before deleting", (done) => {
    moduleTest = new Module({
      title:"Customers test 1",
      path:"/Customers"
    });
    moduleTest.save().then(() => done());
  });
  it("Sends a valid request", async () => {
    const res = await request(app)
      .delete("/api/module/" + moduleTest._id)
      .set("content-type", "application/json");
    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.a("object");
    expect(res.body.data).to.have.property("title");
    expect(res.body.data).to.have.property("path");
    expect(res.body.data._id).to.be.a("string");
    expect(res.body.data._id).to.be.eq(moduleTest._id.toString());
  });

  it("Sends an invalid request - Wrong ID", async () => {
    const res = await request(app)
      .delete("/api/module/60ef4e3f7221301cc8eaafbe")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Missing ID", async () => {
    const res = await request(app)
      .delete("/api/module/")
      .set("content-type", "application/json");
    expect(res.status).to.equal(404);
  });
  it("Sends an invalid request - Body Validation Error", async () => {
    const res = await request(app)
      .delete("/api/module/" + moduleTest._id)
      .set("content-type", "application/json")
      .send({ libelle: "something" });
    expect(res.status).to.equal(400);
  });
  it("Sends an invalid request - Query Validation Error", async () => {
    const res = await request(app)
      .delete("/api/module/" + moduleTest._id + "?param=something")
      .set("content-type", "application/json");
    expect(res.status).to.equal(400);
  });
  it("Expect to throw an Internal Error", async () => {
    const findOneAndRemoveStub = sinon
      .stub(Module, "findOneAndRemove")
      .throws(new Error(""));
    const res = await request(app)
      .delete("/api/module/" + moduleTest._id)
      .set("content-type", "application/json");
    expect(findOneAndRemoveStub).to.be.calledOnce;
    expect(res.status).to.equal(400);
    findOneAndRemoveStub.restore();
  });
});
