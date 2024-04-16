const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
var moment = require("moment-timezone");
const fixture = require("./fixture.json");
const taskController = require("../../../../controllers/task.controller");
const taskService = require("../../../../services/task");
const shiftService = require("../../../../services/shift");
describe("get System StatsController ", () => {
  let getSystemStub;
  let getHighlightsStub;
  let getShiftStub
  beforeEach(() => {
    getShiftStub = sinon.stub(shiftService, "getShiftByUserIDService");
    getSystemStub = sinon.stub(taskService, "getSystemStatsService");
    getHighlightsStub = sinon.stub(taskService, "getTaskHighlightsService");

  });
  afterEach(() => {
    getShiftStub.restore();
    getSystemStub.restore();
    getHighlightsStub.restore();
  });
  it("Expect to return success without filter", async () => {
    const timeZone = "Africa/Tunis";
    const userId = "61796b44032f034827db8a02";
    const startDate = "2021-11-16T08:00:00.000Z";
    const endDate = "2021-11-16T17:00:00.000Z";
    getShiftStub.returns({
      data: {
        role: "5fa02d8f785e4681ddfa3a6d",
        _id: "61796ddee69c9350ec22505a",
        shiftId: null,
        userMicrosoftId: null,
        name: "app_GS",
        startDate: "2021-11-11T00:00:00.000Z",
        endDate: "2031-11-12T00:00:00.000Z",
        updatedShiftAt: "2021-10-27T15:07:48.000Z",
        user: "61796c869f950f6bc0e40315",
        type: "shift",
        reference:
          "5fa02d8f785e4681ddfa3a6dcabe7d5d-b871-41ec-9d8d-19479d645fdd2031",
        theme: null,
        color: null,
        typeId: null,
        createdAt: "2021-10-27T15:07:48.896Z",
        updatedAt: "2021-10-27T15:07:48.896Z",
      },
      status: "success",
    });
    getSystemStub.returns(fixture.serviceResult);
    getHighlightsStub.returns(fixture.serviceHighlightsResult);
    let req = {
      body: {},
      query: {timeZone, userId },
      params: {},
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getSystemStats(req, res);
    expect(getSystemStub).to.be.calledWith(
      "2021-11-11T00:00:00Z",
      "2031-11-12T00:00:00Z",
      "Africa/Tunis",
      "61796b44032f034827db8a02"
    );
    expect(getHighlightsStub).to.be.calledWith(
      "61796b44032f034827db8a02",
      "2021-11-11T00:00:00Z",
      "2031-11-12T00:00:00Z"
    );
    expect(res.status).to.have.been.calledWith(200);
    expect(res.status).to.have.been.calledOnce;
    expect(res.json).be.calledWith({
      data: {
        statistics:[{
          systemName: "WK System3",
          customerName: "Jera Corporation",
          targetTasks: 206,
          createdTasks: 3
        }],
        highlights :{
          Pending: 4,
          Completed: 2,
          Canceled: 6,
          Done: 3
        }
      }
    });
  });

  it("Expect to return success +  Customer ID Filter", async () => {
    const startDate = "2021-11-16T08:00:00.000Z";
    const endDate = "2021-11-16T17:00:00.000Z";
    const timeZone = "Africa/Tunis";
    const userId = "61796b44032f034827db8a02";
    const customerIDFilter = "608bde23c5a2a0a1607294a5";
    getShiftStub.returns({
      data: {
        role: "5fa02d8f785e4681ddfa3a6d",
        _id: "61796ddee69c9350ec22505a",
        shiftId: null,
        userMicrosoftId: null,
        name: "app_GS",
        startDate: "2021-11-11T00:00:00.000Z",
        endDate: "2031-11-12T00:00:00.000Z",
        updatedShiftAt: "2021-10-27T15:07:48.000Z",
        user: "61796c869f950f6bc0e40315",
        type: "shift",
        reference:
          "5fa02d8f785e4681ddfa3a6dcabe7d5d-b871-41ec-9d8d-19479d645fdd2031",
        theme: null,
        color: null,
        typeId: null,
        createdAt: "2021-10-27T15:07:48.896Z",
        updatedAt: "2021-10-27T15:07:48.896Z",
      },
      status: "success",
    });

    getSystemStub.returns(fixture.serviceResult);
    getHighlightsStub.returns(fixture.serviceHighlightsResult);

    const req = {
      body: {},
      query: {timeZone, userId, customerIDFilter },
      params: {}
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getSystemStats(req, res);
    expect(getSystemStub).to.be.calledWith(
      "2021-11-11T00:00:00Z",
      "2031-11-12T00:00:00Z",
      "Africa/Tunis",
      "61796b44032f034827db8a02",
      "608bde23c5a2a0a1607294a5"
    );
    expect(getHighlightsStub).to.be.calledWith(
      "61796b44032f034827db8a02",
      "2021-11-11T00:00:00Z",
      "2031-11-12T00:00:00Z"
    );
    expect(res.status).to.have.been.calledWith(200);
    expect(res.status).to.have.been.calledOnce;
    expect(res.json).be.calledWith({
      data: {
        statistics:[{
          systemName: "WK System3",
          customerName: "Jera Corporation",
          targetTasks: 206,
          createdTasks: 3
        }],
        highlights: {
          Pending: 4,
          Completed: 2,
          Canceled: 6,
          Done: 3
        }
      }
    });
  });

  it("Expect to return success +  Customer ID Filter + Invalid ID", async () => {
    const startDate = "2021-11-16T08:00:00.000Z";
    const endDate = "2021-11-16T17:00:00.000Z";
    const timeZone = "Africa/Tunis";
    const userId = "61796b44032f034827db8a02";
    const customerIDFilter = "Invalid Customer ID";

    getSystemStub.returns(fixture.serviceResult);
    getHighlightsStub.returns(fixture.serviceHighlightsResult);

    const req = {
      body: {},
      query: { customerIDFilter, startDate, endDate, timeZone, userId },
      params: {}
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getSystemStats(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.status).to.have.been.calledOnce;
    expect(res.json).be.calledWith({ message: "This is not a valid ID." });
  });

  it("Expect to return an error", async () => {
    const startDate = "2021-11-16T08:00:00.000Z";
    const endDate = "2021-11-16T17:00:00.000Z";
    const timeZone = "Africa/Tunis";
    const userId = "61796b44032f034827db8a02";
    getShiftStub.returns({
      data: {
        role: "5fa02d8f785e4681ddfa3a6d",
        _id: "61796ddee69c9350ec22505a",
        shiftId: null,
        userMicrosoftId: null,
        name: "app_GS",
        startDate: "2021-11-11T00:00:00.000Z",
        endDate: "2031-11-12T00:00:00.000Z",
        updatedShiftAt: "2021-10-27T15:07:48.000Z",
        user: "61796c869f950f6bc0e40315",
        type: "shift",
        reference:
          "5fa02d8f785e4681ddfa3a6dcabe7d5d-b871-41ec-9d8d-19479d645fdd2031",
        theme: null,
        color: null,
        typeId: null,
        createdAt: "2021-10-27T15:07:48.896Z",
        updatedAt: "2021-10-27T15:07:48.896Z",
      },
      status: "success",
    });
    getSystemStub.returns({ status: "error", err: { message: "error" }, code : 400 });
    getHighlightsStub.returns(fixture.serviceHighlightsResult);

    let req = {
      body: {},
      params: {},
      query: { startDate, endDate, timeZone, userId },
    };
    let res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskController.getSystemStats(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.status).to.have.been.calledOnce;
    expect(res.json).be.calledWith({ message: "error", status: "error" });
  });
});
