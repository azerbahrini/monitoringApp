const sinon = require("sinon");
const expect = require("chai").expect;
const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture = require("../fixture.json");
const taskController = require("../../../../controllers/task.controller");
const taskService = require("../../../../services/task");

describe("controller GET created Tasks test ", () => {
    let stubGetTasksByFilter;
    beforeEach(() => {
        stubGetTasksByFilter = sinon.stub(taskService, "getTasksByFilterService");
    });
    afterEach(() => {
        stubGetTasksByFilter.restore();
    });
    it("expect to send created Tasks", async () => {
        stubGetTasksByFilter.returns({
            data: fixture.arrayofTasks,
            status: "success",
        });

        let req = {
            body: {}, params: {},
            query: {
                customerId: "617812057a088f333a561f58",
                typeId: null,
                categoryId: null,
                systemId: null,
                teamLeaderId: "61796b51032f03506fdb8a6c",
                memberId: "61796b52032f032893db8ab1",
                timeZone: "Africa/Tunis",
                startDate: null,
                endDate: null
            }
        };
        let res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        await taskController.getTasksByFilter(req, res);
        expect(stubGetTasksByFilter).to.be.calledOnce;

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).be.calledWith({
            data: fixture.arrayofTasks,
        });
    });
    it("expect not to send created Tasks test", async () => {
        stubGetTasksByFilter.returns({
            err: { message: "error" },
            status: "error",
        });
        let req = {
            body: {}, params: {}, query:
            {
                customerId: "617812057a088f333a561f58",
                typeId: null,
                categoryId: null,
                systemId: null,
                teamLeaderId: "61796b51032f03506fdb8a6c",
                memberId: "61796b52032f032893db8ab1",
                timeZone: "Africa/Tunis",
                startDate: null,
                endDate: null
            }
        };
        let res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

        await taskController.getTasksByFilter(req, res);
        expect(stubGetTasksByFilter).to.be.calledOnce;
        expect(res.status).to.be.calledWith(400);
        expect(res.json).be.calledWith({
            message: "error",
        });
    });
    it("expect not to send message dates don't match", async () => {
        stubGetTasksByFilter.returns({
            data: { message: "dates don't match" },
            status: "success",
        });
        let req = {
            body: {}, params: {}, query:
            {
                customerId: "617812057a088f333a561f58",
                typeId: null,
                categoryId: null,
                systemId: null,
                teamLeaderId: "61796b51032f03506fdb8a6c",
                memberId: "61796b52032f032893db8ab1",
                timeZone: "Africa/Tunis",
                startDate: null,
                endDate: null
            }
        };
        let res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);

        await taskController.getTasksByFilter(req, res);
        expect(stubGetTasksByFilter).to.be.calledOnce;
        expect(res.status).to.be.calledWith(200);
        expect(res.json).be.calledWith({
            data: [],
            message: "dates don't match",
        });
    });

});
