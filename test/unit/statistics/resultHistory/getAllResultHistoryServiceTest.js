const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const getAllResultHistoryService = require('../../../../services/statistics/getAllResultHistoryService');
const Result = require('../../../../models/Result');

chai.use(sinonChai);

describe('List Of Tasks By Criteria Service TEST ', () => {
  const sandbox = sinon.createSandbox();
  const startDate = '2022-01-17T00:00:00.000Z';
  const endDate = '2022-01-19T00:00:00.000Z';
  const systemId = '608beed8c5a2a0c3017294b9';
  const mapId = '608beed8c5a2a0c3017294b9';
  const timeZone = 'America/New_York';
  const customerId = '608beed8c5a2a0c3017294b9';

  let aggregateStub;
  beforeEach(() => {
    aggregateStub = sandbox.stub(Result, 'aggregate');
  });
  afterEach(() => {
    aggregateStub.restore();
  });
  it('Expect to return an success object', async () => {
    aggregateStub.returns([
        {
            '_id': '61cb19868fdae40aa6cb2d96',
            'state': 'Monitoring',
            'result': [{}],
            'createdAt': '2021-12-28T14:04:54.525Z'
        },
        {
            '_id': '61cb19868fdae40aa6cb2d96',
            'state': 'Monitoring',
            'result': [{}],
            'createdAt': '2021-12-28T14:04:54.525Z'
        }
]);
    const res = await getAllResultHistoryService(
        customerId, systemId, mapId, startDate, endDate, timeZone
    );
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res).to.have.property('statusCode');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
    expect(res.statusCode).to.be.eq(200);
  });

  it('Expect to return an success 204', async () => {
    aggregateStub.returns([]);
    const res = await getAllResultHistoryService(
        customerId, systemId, mapId, startDate, endDate, timeZone
    );
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res).to.have.property('statusCode');
    expect(res.err).to.be.a('object');
    expect(res.err).to.have.property('message');
    expect(res.err.message).to.be.eq('No data can be found');
    expect(res.status).to.be.eq('success');
    expect(res.statusCode).to.be.eq(204);
  });
  it('Expect to return an error object', async () => {
    aggregateStub.throws();
    const res = await getAllResultHistoryService(
        customerId, systemId, mapId, startDate, endDate, timeZone
    );
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res).to.have.property('statusCode');
    expect(res.err).to.be.a('error');
    expect(res.err).to.have.property('message');
    expect(res.err.message).to.be.eq('Error');
    expect(res.status).to.be.eq('error');
    expect(res.statusCode).to.be.eq(400);
  });
});