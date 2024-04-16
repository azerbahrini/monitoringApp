const sinon = require("sinon");
const expect = require("chai").expect;

const fixture = require("../fixture.json");
const clientController = require("../../../../controllers/client.controller");
const clientService = require("../../../../services/client");
const Client = require("../../../../models/Client");
describe("controller GET ALL test ", () => {
  let stubGetAll;
  let findStub;
  beforeEach(() => {
    stubGetAll = sinon.stub(clientService, "getAllClients");
    findStub = sinon.stub(Client, "paginate");
  });
  afterEach(() => {
    stubGetAll.restore();
    findStub.restore();
  });
  it("expect to send all Clients", async () => {
    stubGetAll.returns({
      data: fixture.arrayofClients,
      status: "success",
    });

    let req = { body: {}, params: {}, query: { page: 2, size: 2 } };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await clientController.getAllClients(req, res);
    expect(stubGetAll).to.be.calledOnce;

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofClients,
    });
  });
  // it("Expect to thow an error", async () => {
  //   findStub.throws(new Error("random error"));
  //   let req = { body: {}, params: {} };
  //   let res = {};
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns(res);
  //   await clientController.getAllClients(req, res);

  //   expect(res.status).to.have.been.calledWith(400);
  // });
});
