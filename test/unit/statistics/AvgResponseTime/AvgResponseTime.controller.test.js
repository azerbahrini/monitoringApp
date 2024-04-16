const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const fixture = require('./fixture.json');
const statisticsController = require('../../../../controllers/statistics.controller');
const StatisticsService = require('../../../../services/statistics');

describe('AvgResponseTimeStatistics Controller TEST ', () => {
  const startDate = '2022-01-17T00:00:00.000Z';
  const endDate = '2022-01-19T00:00:00.000Z';
  const customerID = null;
  const systemID = '608beed8c5a2a0c3017294b9';
  const timeZone = 'America/Los_Angeles'
  let AvgResponseTimeStub;
  beforeEach(() => {
    AvgResponseTimeStub = sinon.stub(
      StatisticsService,
      'AvgResponseTimeService'
    );
  });
  afterEach(() => {
    AvgResponseTimeStub.restore();
  });
  it('Expect to return success ', async () => {
    AvgResponseTimeStub.returns(fixture.result);
    const req = {
      body: {},
      params: {},
      query: {
        startDate,
        endDate,
        customerID,
        systemID,
        timeZone
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await statisticsController.AvgResponseTime(req, res);
    expect(AvgResponseTimeStub).to.have.been.calledOnce;
    expect(AvgResponseTimeStub).to.have.been.calledWith(
      startDate,
      endDate,
      customerID,
      systemID,
      timeZone
    );
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(fixture.result.data);
  });
  it('Expect to return success -Without Filters ', async () => {
    AvgResponseTimeStub.returns(fixture.result);
    const req = {
      body: {},
      params: {},
      query: {
        startDate,
        endDate,
        timeZone
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await statisticsController.AvgResponseTime(req, res);
    expect(AvgResponseTimeStub).to.have.been.calledOnce;
    expect(AvgResponseTimeStub).to.have.been.calledWith(startDate, endDate);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(fixture.result.data);
  });

  it('Expect to return error ', async () => {
    AvgResponseTimeStub.returns({
      err: { message: 'Error' },
      status: 'error',
      statusCode: 400
    });
    const req = {
      body: {},
      params: {},
      query: {
        startDate,
        endDate,
        customerID: null,
        systemID: null,
        timeZone
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await statisticsController.AvgResponseTime(req, res);
    expect(AvgResponseTimeStub).to.have.been.calledOnce;
    expect(AvgResponseTimeStub).to.have.been.calledWith(startDate, endDate, timeZone);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: 'Error'
    });
  });
});
