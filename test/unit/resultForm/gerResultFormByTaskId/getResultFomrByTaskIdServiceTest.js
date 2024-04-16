const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai");
chai.use(require("sinon-chai"));
const getFormByTaskId = require("../../../../services/resultForm/getResultFormByTaskId");
const Task = require("../../../../models/Task");

chai.use(sinonChai);

describe("testing get result form by task id service", () => {
  let sandbox;
  let aggregateStub;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    aggregateStub = sandbox.stub(Task, "aggregate");
  });

  afterEach(() => {
    sandbox.restore();
    aggregateStub.restore();
  });
  it("expect to return an success object", async () => {
    const taskId = "61796c869f950f6bc0e40315";

    aggregateStub.returns([
      {
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
      }
    ]
    );
    const res = await getFormByTaskId(taskId);
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("data");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("success");
  });

  it("expect to return No Data ", async () => {
    const taskId = "61796c869f950f6bc0e40315";
    aggregateStub.returns([]);
    const res = await getFormByTaskId(taskId);
    expect(res).to.be.a("object");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("success");
  });
  it("Expect to throw an exception", async () => {
    const taskId = "61796c869f950f6bc0e40315";

    aggregateStub.throws(new Error("Random error"));
    const res = await getFormByTaskId(taskId);
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a("object");
    expect(res).to.have.property("error");
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("error");
  });
});
