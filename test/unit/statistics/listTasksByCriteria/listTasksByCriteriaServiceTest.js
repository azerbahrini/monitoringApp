const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const listOfTasksByCriteria = require('../../../../services/statistics/listOfTasksByCriteria');
const Task = require('../../../../models/Task');

chai.use(sinonChai);

describe('List Of Tasks By Criteria Service TEST ', () => {
  const sandbox = sinon.createSandbox();
  const startDate = '2022-01-17T00:00:00.000Z';
  const endDate = '2022-01-19T00:00:00.000Z';
  const systemID = '608beed8c5a2a0c3017294b9';
  const assigneeId = '608beed8c5a2a0c3017294b9';
  const globalStatus = 'Critical';
  const state = 'Canceled';
  const searchValue = '';
  const timeZone = 'America/Los_Angeles';
  const customerId = '608beed8c5a2a0c3017294b9';

  let aggregateStub;
  beforeEach(() => {
    aggregateStub = sandbox.stub(Task, 'aggregate');
  });
  afterEach(() => {
    aggregateStub.restore();
  });
  it('Expect to return an success object', async () => {
    aggregateStub.returns([
{
        '_id': '61cb19868fdae40aa6cb2d96',
        'type': 'Monitoring',
        'globalStatus': 'Good',
        'state': 'Canceled',
        'resultat': [],
        'title': 'SM50',
        'description': 'SAP Transaction',
        'priority': 0,
        'estimatedStart': '2021-12-28T14:04:54.525Z',
        'timeSpent': 0,
        'assignee': '61826145c2d5a024c6638e9b',
        'map': '616045c6bf7a3c2516ebe856',
        'system': '61540c9adc0963494418542d',
        '__v': 0,
        'createdAt': '2021-12-28T14:04:54.525Z',
        'updatedAt': '2021-12-28T17:00:00.003Z'
    },
    {
        '_id': '61cb19868fdae4f061cb2d97',
        'type': 'Monitoring',
        'globalStatus': 'Good',
        'state': 'Canceled',
        'resultat': [],
        'title': 'SM50',
        'description': 'SAP Transaction',
        'priority': 0,
        'estimatedStart': '2021-12-28T14:04:54.525Z',
        'timeSpent': 0,
        'assignee': '61826145c2d5a024c6638e9b',
        'map': '616045c6bf7a3c2516ebe856',
        'system': '61540c9adc0963494418542d',
        '__v': 0,
        'createdAt': '2021-12-28T14:04:54.525Z',
        'updatedAt': '2021-12-28T18:00:00.011Z'
    }
]);
    const res = await listOfTasksByCriteria(
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
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res).to.have.property('statusCode');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
    expect(res.statusCode).to.be.eq(200);
  });
  it('Expect to return an success object + no filters', async () => {
    aggregateStub.returns([
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
            },
            {
                '_id': '61cb19868fdae4f061cb2d97',
                'type': 'Monitoring',
                'globalStatus': 'Good',
                'state': 'Canceled',
                'resultat': [],
                'title': 'SM50',
                'description': 'SAP Transaction',
                'priority': 0,
                'estimatedStart': '2021-12-28T16:00:00.000Z',
                'timeSpent': 0,
                'assignee': '61826145c2d5a024c6638e9b',
                'map': '616045c6bf7a3c2516ebe856',
                'system': '61540c9adc0963494418542d',
                '__v': 0,
                'createdAt': '2021-12-28T14:04:54.525Z',
                'updatedAt': '2021-12-28T18:00:00.011Z'
            }
        ]);
    const res = await listOfTasksByCriteria(timeZone, null, null, null, null, null, null, null);
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
    const res = await listOfTasksByCriteria(
      timeZone,
      customerId,
      globalStatus,
      state,
      startDate,
      endDate,
      assigneeId,
      systemID
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
    const res = await listOfTasksByCriteria(
      timeZone,
      customerId,
      globalStatus,
      state,
      startDate,
      endDate,
      assigneeId,
      systemID
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