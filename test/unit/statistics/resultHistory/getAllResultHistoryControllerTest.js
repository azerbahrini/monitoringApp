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
    const systemId = '608beed8c5a2a0c3017294b9';
    const mapId = '608beed8c5a2a0c3017294b9';
    const timeZone = 'America/New_York';
    const customerId = '608beed8c5a2a0c3017294b9';

  let resultHistoryStub;
  beforeEach(() => {
    resultHistoryStub = sinon.stub(
      StatisticsService,
      'getAllResultHistoryService'
    );
  });
  afterEach(() => {
    resultHistoryStub.restore();
  });
  it('Expect to return success ', async () => {
    resultHistoryStub.returns({
        data: [
            {
                '_id': '61cb19868fdae40aa6cb2d96',
                'state': 'Monitoring',
                'result': [{}],
                'createdAt': '2021-12-28T14:04:54.525Z'
            }
],
        status: 'success',
        statusCode: 200
      });
    const req = {
      body: {},
      params: {},
      query: {
        startDate,
        endDate,
        systemId,
        mapId,
        timeZone,
        customerId
    }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await statisticsController.getAllResultHistory(req, res);
    expect(resultHistoryStub).to.have.been.calledOnce;
    expect(resultHistoryStub).to.have.been.calledWith(
        customerId, systemId, mapId, startDate, endDate, timeZone
    );
    expect(res.status).to.have.been.calledWith(200);
  });

  it('Expect to return error ', async () => {
    resultHistoryStub.returns({
      err: { message: 'Error' },
      status: 'error',
      statusCode: 400
    });
    const req = {
      body: {},
      params: {},
      query: {
        customerId, startDate, endDate, systemId, mapId, timeZone
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await statisticsController.getAllResultHistory(req, res);
    expect(resultHistoryStub).to.have.been.calledOnce;
    expect(resultHistoryStub).to.have.been.calledWith(
        customerId, systemId, mapId, startDate, endDate, timeZone);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: 'Error'
    });
  });
});