const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");
const mongoose = require("mongoose");

const fixture = require("../fixture.json");
const addUser = require("../../../../services/user/addUser.service");
const User = require("../../../../models/User");

chai.use(sinonChai);

describe("testing add service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(User, "create");
  });
  afterEach(() => {
    createStub.restore();
  });
  it("expect to return an success object", async () => {

    createStub.returns(fixture.returnedUser);

    const res = await addUser("firstNameTest",
    "lastNameTest",
     "emailTest",
     "12345",
     "121212",
     null,
     null,
     null,
     "000");

    expect(createStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an success object - adding random property ", async () => {
    createStub.returns(fixture.returnedUser);

    const res = await addUser("firstNameTest",
    "lastNameTest",
     "emailTest",
     "12345",
     "121212",
     null,
     null,
     null,
     "000");
    expect(createStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("expect to return an error object - missing property", async () => {
    const res = await addUser("firstNameTest",
    "lastNameTest",
     "emailTest",
     "12345",
     null,
     null,
     "000");
    expect(createStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.status).to.be.eq("error");
  });
});
