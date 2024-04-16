const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");

const fixture = require("../fixture.json");
const addClient = require("../../../../services/client/add");
const Client = require("../../../../models/Client");
chai.use(sinonChai);
const mongooseError = (modelName, listPropertyError) => {
  const refectoredList = listPropertyError.reverse().map((elem) => {
    return " " + elem + ": Path `" + elem + "` is required.";
  });
  return modelName + " validation failed:" + refectoredList.join(",");
};
describe(" POST Client service", () => {
  let createStub;
  let sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(Client, "create");
  });
  afterEach(() => {
    createStub.restore();
  });

  it("Expect to return an success object", async () => {
    createStub.returns(fixture.clientDataTest);

    const res = await addClient(fixture.clientDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.data).to.be.a("object");
    expect(res.status).to.be.eq("success");
  });

  it("Expect to return an error object - Client No created", async () => {
    createStub.throws(
      new Error(mongooseError("postClientError", ["clientNumber"]))
    );
    const res = await addClient(fixture.clientDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith({});
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err.message).to.be.a("string");
    expect(res.err.message).to.be.eq(
      mongooseError("postClientError", ["clientNumber"])
    );
    expect(res.status).to.be.eq("error");
  });

  it("Expect to throw an error ", async () => {
    createStub.throws(new Error("Random error"));
    const res = await addClient();
    expect(res).to.be.a("object");
    expect(res).to.have.property("err");
    expect(res).to.have.property("status");
    expect(res.err).to.be.a("error");
    expect(res.status).to.be.eq("error");
  });
});
