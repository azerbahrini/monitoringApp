const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");

const updateCategoryService = require("../../../../services/category/update");
const Category = require("../../../../models/Category");
const fixture = require("./fixture.json");

chai.use(sinonChai);

describe("testing UPDATE Category service", () => {
  const sandbox = sinon.createSandbox();
  let findOneAndUpdateStub;
  let findOneStub;
  const idTest = fixture.update.success.body.data.id;
  const unknownId = "60ef4e3f7221301cc8eaafrd";
  beforeEach("", () => {
    findOneAndUpdateStub = sandbox.stub(Category, "findOneAndUpdate");
    findOneStub = sandbox.stub(Category, "findOne");
  });
  it("expect to return an success object", async () => {
    const newCategWithId = {
      _id: fixture.update.success.body.data.id,
      category: "hi",
      isActive: true,
    };
    const newCategWithoutId = {
      category: "hi",
      isActive: true,
    };
    findOneAndUpdateStub.returns(newCategWithId);
    findOneStub.returns(newCategWithId);
    const res = await updateCategoryService(
      { _id: idTest },
      newCategWithoutId
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;

    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: idTest },
      newCategWithoutId
    );
    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.be.calledWith({ _id: idTest });
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - no id", async () => {
    const newCategWithoutId = {
      libelle: "hi",
      isActive: true,
    };

    const res = await updateCategoryService(
      { _id: undefined },
      newCategWithoutId
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an fail object - wrong id", async () => {
    const newCategWithoutId = {
      libelle: "hi",
      active: true,
    };
    findOneAndUpdateStub.returns(undefined);
    const res = await updateCategoryService(
      { _id: unknownId },
      newCategWithoutId
    );
    expect(findOneAndUpdateStub).to.have.been.calledOnce;
    expect(findOneAndUpdateStub).to.be.calledWith(
      { _id: unknownId },
      newCategWithoutId
    );
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("object");
    expect(res.status).to.be.eq("error");
  });
  it("expect to throw an error", async () => {
    const res = await updateCategoryService();
    findOneAndUpdateStub.throws(new Error());
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    findOneAndUpdateStub.restore();
    findOneStub.restore();
  });
  sandbox.restore();
});
