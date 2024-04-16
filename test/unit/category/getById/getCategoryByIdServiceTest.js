const sinon = require("sinon");
const request = require("request");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("./fixture.json");
const getCategoryById = require("../../../../services/category/getById");
const Category = require("../../../../models/Category");

chai.use(sinonChai);

describe("testing get by id Category service", () => {
  const sandbox = sinon.createSandbox();
  let findOneStub;
  const idTest = fixture.single.success.body.data[0].id;
  const unknownId = "60ef4e3f7221301cc8eaafrd";
  beforeEach("", () => {
    findOneStub = sandbox.stub(Category, "findOne");
  });
  it("expect to return an success object", async () => {
    findOneStub.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.single.success.body.data,
      }),
    });
    expect(idTest).to.be.a("string");
    const res = await getCategoryById(idTest);
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: idTest });

    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("array");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - wrong id", async () => {
    findOneStub.returns({
      lean: sandbox.stub().returns({
        exec: () => {},
      }),
    });

    const res = await getCategoryById(unknownId);
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: unknownId });
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    findOneStub.throws(new Error("random error"));
    const res = await getCategoryById();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findOneStub.restore();
  });
  sandbox.restore();
});
