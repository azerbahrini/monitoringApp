const sinon = require("sinon");
const chai = require("chai");
var expect = chai.expect;
const sinonChai = require("sinon-chai");

const updateAssigneeService = require("../../../../services/task/updateAssignee");
const Task = require("../../../../models/Task");
const fixture = require("../fixture.json");

chai.use(sinonChai);

describe("testing UPDATE Task service", () => {
  const sandbox = sinon.createSandbox();
  let updateManyStub;
  let findStub;
  beforeEach("", () => {
    updateManyStub = sandbox.stub(Task, "updateMany");
    findStub = sandbox.stub(Task, "find");
  });
  it("expect to return an success object", async () => {
    updateManyStub.returns({
      lean: sandbox.stub().returns({
        exec: () => ({
          data: {
            n: 2,
            nModified: 2,
            ok: 1,
          },
        }),
      }),
    });
    findStub.returns({
      lean: sandbox.stub().returns({
        exec: () => [
          {
            _id: "6090871e2b4129c3cc2c8757",
            type: "Monitoring",
            globalStatus: "Good",
            state: "Canceled",
            request: "Pending",
            resultat: [],
            title: "SM21",
            description: "SAP transaction",
            map: "609060b12b4129641e2c8675",
            user: "6089dae7c5a2a04910729391",
            system: "608beed8c5a2a0c3017294b9",
            __v: 0,
            createdAt: "2021-05-03T23:28:30.207Z",
            updatedAt: "2021-11-10T10:10:57.558Z",
            assignee: "6089dae7c5a2a04910723333",
            estimatedStart: "2021-05-03T21:00:00.000Z",
          },
        ],
      }),
    });
    const res = await updateAssigneeService({
      taskIDs: ["6090871e2b4129c3cc255555"],
      assigneeId: "6089dae7c5a2a04910723333",
    });
    expect(updateManyStub).to.have.been.calledOnce;
    expect(findStub).to.have.been.calledOnce;

    expect(updateManyStub).to.be.calledWith({
      _id: { $in: ["6090871e2b4129c3cc255555"] },
    });
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("success");
  });
  it("expect to return an fail object - no Body", async () => {
    findStub.returns({
      lean: sandbox.stub().returns({
        exec: () => [],
      }),
    });

    updateManyStub.returns({
      lean: sandbox.stub().returns({
        exec: () => undefined,
      }),
    });
    const res = await updateAssigneeService();
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("error");
  });

  it("expect to return an fail object - Not All Tasks Updated", async () => {
    findStub.returns({
      lean: sandbox.stub().returns({
        exec: () => [
          {
            _id: "6090871e2b4129c3cc2c8757",
            type: "Monitoring",
            globalStatus: "Good",
            state: "Canceled",
            request: "Pending",
            resultat: [],
            title: "SM21",
            description: "SAP transaction",
            map: "609060b12b4129641e2c8675",
            user: "6089dae7c5a2a04910729391",
            system: "608beed8c5a2a0c3017294b9",
            __v: 0,
            createdAt: "2021-05-03T23:28:30.207Z",
            updatedAt: "2021-11-10T10:10:57.558Z",
            assignee: "6089dae7c5a2a04910723333",
            estimatedStart: "2021-05-03T21:00:00.000Z",
          },
        ],
      }),
    });

    updateManyStub.returns({
      lean: sandbox.stub().returns({
        exec: () => ({
          error: {
            message: "Not All Tasks Updated.",
          },
          data: [
            {
              taskName: "SM21",
              task_id: "6090871e2b4129c3cc2c8757",
              estimatedStart: "2021-05-03T21:00:00.000Z",
            },
          ],
        }),
      }),
    });
    const res = await updateAssigneeService({
      taskIDs: ["6090871e2b4129c3cc2c8757"],
      assigneeId: "6089dae7c5a2a04910723322",
    });
    expect(updateManyStub).to.have.been.calledOnce;
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("incomplete");
  });

  it("expect to return an Error - Task not found", async () => {
    updateManyStub.returns({
      lean: sandbox.stub().returns({
        exec: () => ({
         
            n: 0,
            nModified: 0,
            ok: 1,
          
        }),
      }),
    });
    findStub.returns({
      lean: sandbox.stub().returns({
        exec: () => [],
      }),
    });
    const res = await updateAssigneeService({
      taskIDs: ["6090871e2b4129c3cc255555"],
      assigneeId: "6089dae7c5a2a04910723333",
    });
    expect(updateManyStub).to.have.been.calledOnce;
    expect(findStub).to.have.been.calledOnce;

    expect(updateManyStub).to.be.calledWith({
      _id: { $in: ["6090871e2b4129c3cc255555"] },
    });
    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("error");
  });

  it("expect to throw an error", async () => {
    updateManyStub.throws(new Error());
    const res = await updateAssigneeService();

    expect(res).to.have.property("status");
    expect(res.status).to.be.eq("error");
  });

  afterEach(() => {
    updateManyStub.restore();
    findStub.restore();
  });
  sandbox.restore();
});
