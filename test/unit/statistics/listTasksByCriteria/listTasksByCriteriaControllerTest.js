const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const statisticsController = require('../../../../controllers/statistics.controller');
const StatisticsService = require('../../../../services/statistics');

describe('List Of Tasks Controller TEST ', () => {
    const startDate = '2022-01-17T00:00:00.000Z';
    const endDate = '2022-01-19T00:00:00.000Z';
    const systemID = '608beed8c5a2a0c3017294b9';
    const assigneeId = '608beed8c5a2a0c3017294b9';
    const globalStatus = 'Critical';
    const state = 'Canceled';
    const searchValue = '';
    const timeZone = 'America/New_York';
    const customerId = '608beed8c5a2a0c3017294b9';

  let numberOfTasksStub;
  beforeEach(() => {
    numberOfTasksStub = sinon.stub(
      StatisticsService,
      'listOfTasksService'
    );
  });
  afterEach(() => {
    numberOfTasksStub.restore();
  });
  it('Expect to return success ', async () => {
    numberOfTasksStub.returns({
        data: [
            {
                '_id': '61cb19868fdae40aa6cb2d96',
                'type': 'Monitoring',
                'globalStatus': 'Good',
                'state': 'Canceled',
                'resultat': [],
                'title': 'SM50',
                'description': 'SAP Transaction',
                'priority': 0,
                'estimatedStart': '2021-12-28T15:00:00.000Z',
                'timeSpent': 0,
                'assignee': '61826145c2d5a024c6638e9b',
                'map': '616045c6bf7a3c2516ebe856',
                'system': '61540c9adc0963494418542d',
                '__v': 0,
                'createdAt': '2021-12-28T14:04:54.525Z',
                'updatedAt': '2021-12-28T17:00:00.003Z'
            }
],
        status: 'success',
        statusCode: 200
      });
    const req = {
      body: {},
      params: {},
      query: {
        timeZone,
        customerId,
        globalStatus,
        state,
        startDate,
        endDate,
        assigneeId,
        systemID,
        searchValue
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await statisticsController.listOfTasks(req, res);
    expect(numberOfTasksStub).to.have.been.calledOnce;
    expect(numberOfTasksStub).to.have.been.calledWith(
        timeZone,
        customerId,
        globalStatus,
        state,
        startDate,
        endDate,
        assigneeId,
        systemID,
        searchValue
    );
    expect(res.status).to.have.been.calledWith(200);
  });
  it('Expect to return success -Without Filters ', async () => {
    numberOfTasksStub.returns({
        data: [
            {
                '_id': '61cb19868fdae40aa6cb2d96',
                'type': 'Monitoring',
                'globalStatus': 'Good',
                'state': 'Canceled',
                'resultat': [],
                'title': 'SM50',
                'description': 'SAP Transaction',
                'priority': 0,
                'estimatedStart': '2021-12-28T15:00:00.000Z',
                'timeSpent': 0,
                'assignee': '61826145c2d5a024c6638e9b',
                'map': '616045c6bf7a3c2516ebe856',
                'system': '61540c9adc0963494418542d',
                '__v': 0,
                'createdAt': '2021-12-28T14:04:54.525Z',
                'updatedAt': '2021-12-28T17:00:00.003Z'
            }
],
        status: 'success',
        statusCode: 200
      });
    const req = {
      body: {},
      params: {},
      query: {
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await statisticsController.listOfTasks(req, res);
    expect(numberOfTasksStub).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith();
  });

  it('Expect to return error ', async () => {
    numberOfTasksStub.returns({
      err: { message: 'Error' },
      status: 'error',
      statusCode: 400
    });
    const req = {
      body: {},
      params: {},
      query: {
        timeZone,
        customerId,
        globalStatus,
        state,
        startDate,
        endDate,
        assigneeId,
        systemID,
        searchValue
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await statisticsController.listOfTasks(req, res);
    expect(numberOfTasksStub).to.have.been.calledOnce;
    expect(numberOfTasksStub).to.have.been.calledWith(
        timeZone,
        customerId,
        globalStatus,
        state,
        startDate,
        endDate,
        assigneeId,
        systemID,
        searchValue);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: 'Error'
    });
  });
});