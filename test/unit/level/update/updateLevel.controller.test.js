const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const LevelController = require("../../../../controllers/level.controller");
const levelService = require("../../../../services/level");

describe("controller UPDATE level test ", () => {
  let stubUpdate;
  beforeEach(() => {
    stubUpdate = sinon.stub(levelService, "updateLevel");
  });
  afterEach(() => {
    stubUpdate.restore();
  });
  it("expect to return new level ", async () => {
    stubUpdate.returns({
      data: fixture.levelDataTest,
      status: "success",
    });
    let req = {
      body: { ...fixture.levelDataTestWithoutID },
      params: { id: fixture.levelDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await LevelController.updateLevel(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.levelDataTest,
    });
  });

  it("expect to return a 400 error ", async () => {
    stubUpdate.returns({
      err: { message: "a 400 error" },
      status: "error",
    });
    let req = {
      body: { ...fixture.levelDataTestWithoutID },
      params: { id: fixture.levelDataTest._id },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await LevelController.updateLevel(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: "a 400 error",
    });
  });

  it("expect to return an error - ID Does not exist", async () => {
    stubUpdate.returns({
      err: { message: "level not found" },
      status: "error",
      statusCode: 404,
    });
    let req = {
      body: { ...fixture.levelDataTest },
      params: { id: fixture.wrongID },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await LevelController.updateLevel(req, res);
    expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: "level not found",
    });
  });
});
