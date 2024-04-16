const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
const {app} = require("../../../../server");
const fixture = require("../fixture.json");
const getTypesbyCustomerId = require("../../../../services/system/getTypesbyCustomerId");
const System = require("../../../../models/System");
chai.use(sinonChai);

const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};

describe("GET ALL Systems Types By Customers service", () => {
  let sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(System, "find");
  });
  afterEach(() => {
    findStub.restore();
  });

  it("Expect to return an success object", async () => {
    const arrayoftypes = [
      {
        _id: "608be4b7c5a2a005c87294b1",
        types: "PRD",
      },
      {
        _id: "608be4d2c5a2a083e47294b3",
        types: "QAS",
      },
      {
        _id: "608bfb6ac5a2a07d1c7294cc",
        types: "DEV",
      },
    ];
    findStub.returns(arrayoftypes);
    findStub.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => [
            {
              _id: "608be4b7c5a2a005c87294b1",
              types: "PRD",
            },
            {
              _id: "608be4d2c5a2a083e47294b3",
              types: "QAS",
            },
            {
              _id: "608bfb6ac5a2a07d1c7294cc",
              types: "DEV",
            },
          ],
        }),
      }),
    });
    const res = await getTypesbyCustomerId("608bde23c5a2a0a1607294a5");
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an empty object", async () => {
    const arrayoftypes = [];
    // findStub.returns(arrayoftypes);
    findStub.returns({
      populate: sandbox.stub().returns(arrayoftypes),
    });
    const res = await getTypesbyCustomerId("608bde23c5a2a0a1607294a5");
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res).to.have.property("statusCode");
    expect(res.err).to.have.property("message");
    expect(res.err.message).to.be.eq("No  Type match this criteria !");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
    expect(res.statusCode).to.be.eq(404);
  });

  it("testhere", async () => {
    const arrayoftypes = [
      {
        _id: "608be4b7c5a2a005c87294b1",
        type: "PRD",
      },
      {
        _id: "608be4d2c5a2a083e47294b3",
        type: "QAS",
      },
      {
        _id: "608bfb6ac5a2a07d1c7294cc",
        type: "DEV",
      },
    ];
    // findStub.returns(arrayoftypes);
    findStub.returns({
      populate: sandbox.stub().returns(arrayoftypes),
    });
    const res = await getTypesbyCustomerId("608bde23c5a2a0a1607294a5");
    expect(findStub).to.have.been.calledOnce;

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to throw an exception", async () => {
    findStub.throws(new Error("Random error"));
    const res = await getTypesbyCustomerId();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
