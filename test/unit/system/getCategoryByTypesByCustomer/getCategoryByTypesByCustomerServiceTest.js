const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const {app} = require("../../../../server");
const fixture = require("../fixture.json");
const getCategoriesByTypeByCustomer = require("../../../../services/system/getCategoriesByTypeByCustomer");
const System = require("../../../../models/System");
chai.use(sinonChai);
describe("GET ALL Systems categories By Customers service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(System, "find");
  });
  afterEach(() => {
    findStub.restore();
  });

  it("Expect to return an success object", async () => {
    const arrayOfCategories = [
      {
        _id: "608be4b7c5a2a005c87294b1",
        category: "Boomi",
      },
      {
        _id: "608be4d2c5a2a083e47294b3",
        category: "SAP-BO",
      },
      {
        _id: "608bfb6ac5a2a07d1c7294cc",
        category: "SAP-SOLMAN",
      },
    ];
    findStub.returns(arrayOfCategories);
    findStub.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => [
            {
              _id: "608be4b7c5a2a005c87294b1",
              category: "Boomi",
            },
            {
              _id: "608be4d2c5a2a083e47294b3",
              category: "SAP-BO",
            },
            {
              _id: "608bfb6ac5a2a07d1c7294cc",
              category: "SAP-SOLMAN",
            },
          ],
        }),
      }),
    });
    const res = await getCategoriesByTypeByCustomer(
      "608bde23c5a2a0a1607294a5",
      "608bde23c5a2a0a1607294a6"
    );
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an empty object", async () => {
    const arrayOfCategories = [];

    findStub.returns({
      populate: sandbox.stub().returns(arrayOfCategories),
    });
    const res = await getCategoriesByTypeByCustomer(
      "608bde23c5a2a0a1607294a5",
      "608bde23c5a2a0a1607294a6"
    );
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res).to.have.property("statusCode");
    expect(res.err).to.have.property("message");
    expect(res.err.message).to.be.eq("No  Category match this criteria !");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
    expect(res.statusCode).to.be.eq(404);
  });

  it("testhere", async () => {
    const arrayOfCategories = [
      {
        _id: "608be4b7c5a2a005c87294b1",
        category: "Boomi",
      },
      {
        _id: "608be4d2c5a2a083e47294b3",
        category: "SAP-BO",
      },
      {
        _id: "608bfb6ac5a2a07d1c7294cc",
        category: "SAP-SOLMAN",
      },
    ];

    findStub.returns({
      populate: sandbox.stub().returns(arrayOfCategories),
    });
    const res = await getCategoriesByTypeByCustomer(
      "608bde23c5a2a0a1607294a5",
      "608bde23c5a2a0a1607294a6"
    );
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getCategoriesByTypeByCustomer();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
