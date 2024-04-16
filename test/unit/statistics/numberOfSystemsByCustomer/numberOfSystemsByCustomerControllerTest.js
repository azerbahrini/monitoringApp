const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const statisticsController = require('../../../../controllers/statistics.controller');
const StatisticsService = require('../../../../services/statistics');

describe('Number Of Systems By Customer Controller TEST ', () => {
  const startDate = '2022-01-17T00:00:00.000Z';
  const endDate = '2022-01-19T00:00:00.000Z';
  const customerID = '608beed8c5a2a0c3017294b9';
  const timeZone = 'America/Los_Angeles'

  let systemsByCustomerStub;
  beforeEach(() => {
    systemsByCustomerStub = sinon.stub(
      StatisticsService,
      'numberOfSystemsByCustomer'
    );
  });
  afterEach(() => {
    systemsByCustomerStub.restore();
  });
  it('Expect to return success ', async () => {
    systemsByCustomerStub.returns({
        data: { 'number Of Systems': 1 },
        status: 'success',
        statusCode: 200
      });
    const req = {
      body: {},
      params: {},
      query: {
        startDate,
        endDate,
        customerID,
        timeZone
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await statisticsController.systemsByCustomer(req, res);
    expect(systemsByCustomerStub).to.have.been.calledOnce;
    expect(systemsByCustomerStub).to.have.been.calledWith(
      startDate,
      endDate,
      customerID,
      timeZone
    );
    expect(res.status).to.have.been.calledWith(200);
  });

  it('Expect to return error ', async () => {
    systemsByCustomerStub.returns({
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
        timeZone
      }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await statisticsController.systemsByCustomer(req, res);
    expect(systemsByCustomerStub).to.have.been.calledOnce;
    expect(systemsByCustomerStub).to.have.been.calledWith(startDate, endDate);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: 'Error'
    });
  });
});
