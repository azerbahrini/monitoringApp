const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const clientController = require("../../../../controllers/client.controller");
const clientService = require("../../../../services/client");
describe("controller POST Client by id test ", () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(clientService, "addClient");
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it("send a correct type object ", async () => {
    stubAdd.returns({
      data: fixture.clientDataTest,
      status: "success",
    });
    let req = {
      body: {
        ...fixture.clientDataTestWithoutID,
        systemId: "608bde23c5a2a0a1607294a5",
      },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await clientController.addClient(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.clientDataTest,
    });
    it("expect to return an error - Invalid Status", async () => {
      stubAdd.returns({
        err: { message: "invalidStatus" },
        status: "invalidStatus",
      });
      let req = {
        body: { ...fixture.clientDataTestWithoutID },
        params: {},
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await clientController.addClient(req, res);
      expect(stubAdd).to.be.calledWith(req.body);
    });
    it("send a correct client object  + route + method + ip", async () => {
      stubAdd.returns({
        data: fixture.clientDataTest,
        status: "success",
      });
      let req = {
        body: { ...fixture.clientDataTestWithoutID },
        params: {},
        route: "/testing",
        method: "post",
        ip: "1234",
      };
      let res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      await clientController.addClient(req, res);
      expect(stubAdd).to.be.calledWith(req.body);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).be.calledWith({
        data: fixture.clientDataTest,
      });
    });
  
  });
  it("send a wrong data form - Missing Property", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { isActive: fixture.clientDataTest.isActive },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await clientController.addClient(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
  it("send a wrong data form - Missing Property  + route + method + ip", async () => {
    stubAdd.returns({
      err: { message: "missing property" },
      status: "error",
    });
    let req = {
      body: { title: fixture.clientDataTest.title },
      params: {},
      route: "/testing",
      method: "post",
      ip: "1234",
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await clientController.addClient(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "missing property",
    });
  });
});
