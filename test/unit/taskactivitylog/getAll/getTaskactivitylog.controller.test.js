const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const taskactivitylogController = require('../../../../controllers/taskactivitylog.controller');
const taskActivityLogService = require('../../../../services/taskActivityLog');
const fixture= require('./fixture.json');

describe('Get task Activity logs Controller TEST ', () => {
  let getAllStub;
  beforeEach(() => {
    getAllStub = sinon.stub(taskActivityLogService, 'getTaskActivityLogs');
  });
  afterEach(() => {
    getAllStub.restore();
  });
  it('Expect to return success ', async () => {
    const date = '2022-02-08T08:30';
    const shiftName = 'night shift';
    getAllStub.returns(fixture.result);
    const req = {
      query: {
        date,
        shiftName
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskactivitylogController.getTaskActivityLogs(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      data: fixture.result.data,
      status: 'success'
    });
    expect(getAllStub).to.have.been.calledWith(date, shiftName);
    expect(getAllStub).to.have.been.calledOnce;
  });

  it('Expect to return error ', async () => {
    const date = '2022-02-08T08:30';
    const shiftName = 'night shift';
    getAllStub.returns(fixture.error);
    const req = {
      query: {
        date,
        shiftName
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await taskactivitylogController.getTaskActivityLogs(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: 'invalid request error',
      status: 'error'
    });
    expect(getAllStub).to.have.been.calledWith(date, shiftName);
    expect(getAllStub).to.have.been.calledOnce;
  });
});
