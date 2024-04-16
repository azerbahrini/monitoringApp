const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const levelController = require("../../../../controllers/level.controller");
const levelService = require("../../../../services/level");

describe("controller GET ALL Level test ", () => {
  let stubGetAll;
  beforeEach(() => {
    stubGetAll = sinon.stub(levelService, "getAllLevel");
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it("expect to send all level ", async () => {
    stubGetAll.returns({
      data: fixture.arrayofLevels,
      status: "success",
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 }  };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await levelController.getAllLevels(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayofLevels,
    });
  });

  it("expect NOT to send all level 400 error", async () => {
    stubGetAll.returns({
      err: {message:"a 400 error"},
      status: "error",
    });
    let req = { body: {}, params: {}, query: { page: 2, size: 2 }  };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await levelController.getAllLevels(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "a 400 error",
    });
  });

  // it("expect to throw an error", async () => {
  //   stubGetAll.throws(new Error("error message"));
  //   let req = { body: {}, params: {} };
  //   let res = {};
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns(res);
  //   await typeController.getAllClass(req, res);
  //   expect(stubGetAll).to.be.calledOnce;
  //   expect(res.status).to.have.been.calledWith(400);
  //   expect(res.json).be.calledWith({
  //     message: "error message",
  //   });
  // });
});
