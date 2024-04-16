const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const resultFormController = require("../../../../controllers/resultForm.controller");
const resultFormService = require("../../../../services/resultForm");

describe("controller GET ALL Task test ", () => {
  let stubGetAll;
  beforeEach(() => {
    stubGetAll = sinon.stub(resultFormService, "getResultFormByTaskId");
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it("expect to send all Tasks", async () => {
    stubGetAll.returns({
      data: {
        _id: "61ade4098a096166a870faec",
        state: "Pending",
        title: "task test",
        resultFormConfig: {
          _id: "61ade4098a096166a870faea",
          isActive: true,
          formSchema: {
            test: "6189549b05812f2a68ef7aed"
          },
          formUISchema: {
            test: "6189549b05812f2a68ef7987"
          },
          formLimits: {
            test: "6189549b05812f2a68ef7123"
          },
          monitoringActivity: "60ef4e3f7221301cc8eaafbe"
        }
      },
      status: "success",
      code: 200
    });

    const req = {
      body: {},
      params: { taskId: "61796c869f950f6bc0e40315" },
      query: {}
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await resultFormController.getFormSchemaByTaskId(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
  });

  it("Expect to return an error - ID Does not exist", async () => {
    stubGetAll.returns({
      error: { message: "No data can be found." },
      code: 204,
      status: "success"
    });
    const req = {
      body: {},
      params: { taskId: "61796c869f950f6bc0e40315" }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await resultFormController.getFormSchemaByTaskId(req, res);
    expect(stubGetAll).to.be.calledWith(req.params.taskId);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).be.calledWith({
      message: "No data can be found."
    });
  });
});
