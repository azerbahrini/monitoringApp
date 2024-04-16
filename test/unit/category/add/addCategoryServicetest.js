const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
const mongoose = require("mongoose");

const fixture = require("./fixture.json");
const addCategoryService = require("../../../../services/category/add");
const Category = require("../../../../models/Category");

chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe("testing add service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(Category, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("expect to return an success object", async () => {
    const categoryObject = {
      category: fixture.add.success.body.data[0].category,
      isActive: fixture.add.success.body.data[0].active,
    };

    createStub.returns(fixture.add.success.body.data[0]);

    const res = await addCategoryService(categoryObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(categoryObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an success object - adding random property ", async () => {
    const categoryObject = {
      category: fixture.add.success.body.data[0].category,
      isActive: fixture.add.success.body.data[0].active,
      name: "test",
    };

    createStub.returns(fixture.add.success.body.data[0]);

    const res = await addCategoryService(categoryObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(categoryObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an error object - empty object", async () => {
    const categoryObject = {};
    createStub.throws(
      new Error(mongooseError("category", ["category", "active"]))
    );
    const res = await addCategoryService(categoryObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(categoryObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    //expect(res.err).to.be.a("object");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(
      mongooseError("category", ["category", "active"])
    );
    expect(res.status).to.be.eq("error");
  });
  it("expect to return an error object - missing property", async () => {
    const categoryObject = { isActive: fixture.add.success.body.data[0].active };
    createStub.throws(new Error(mongooseError("category", ["category"])));
    const res = await addCategoryService(categoryObject);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(categoryObject);
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    //expect(res.err).to.be.a("object");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(mongooseError("category", ["category"]));
    expect(res.status).to.be.eq("error");
  });
});
