const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
chai.use(require('sinon-chai'));
const getTasksService = require('../../../../services/task/getTaskList');
const Task = require('../../../../models/Task');
const moment = require('moment-timezone');

chai.use(sinonChai);

describe('testing get all Tasks Filtred service', () => {
  let sandbox;
  let aggregateStub;
  let aggregatePaginateStub;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    aggregateStub = sandbox.stub(Task, 'aggregate');
    aggregatePaginateStub = sandbox.stub(Task, 'aggregatePaginate')
  });

  afterEach(() => {
    sandbox.restore();
    aggregateStub.restore();
    aggregatePaginateStub.restore();
  });
  it('expect to return an success object', async () => {
    const searchValue = 'SP01 PR1';
    const startDate = moment('2021-11-20T17:00:00+08:00').format();
    const endDate = moment('2021-11-20T17:00:00+08:00').format();
    const timeZone = 'Asia/Taipei';
    const page = 1;
    const size = 1000 ;
    const paginate = true

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
          'estimatedStart': '2021-12-28T23:00:00+08:00',
          'timeSpent': 0,
          'assignee': '61826145c2d5a024c6638e9b',
          'map': '616045c6bf7a3c2516ebe856',
          'system': '61540c9adc0963494418542d',
          'createdAt': '2021-12-28T14:04:54.525Z',
          'updatedAt': '2021-12-28T17:00:00.003Z',
          'resultId': '61bb895359dbcc0e9c4c75e5',
          'resultCreatedAt': '2021-12-17T02:45:39+08:00',
          'assigneeName': 'Mohamed Bouazza',
          'systemName': 'WK System3',
          'customerName': 'Jera Corporation'
      }
])
    aggregatePaginateStub.returns({
        'docs': [
            {
                '_id': '61cb19868fdae40aa6cb2d96',
                'type': 'Monitoring',
                'globalStatus': 'Good',
                'state': 'Canceled',
                'resultat': [],
                'title': 'SM50',
                'description': 'SAP Transaction',
                'priority': 0,
                'estimatedStart': '2021-12-28T23:00:00+08:00',
                'timeSpent': 0,
                'assignee': '61826145c2d5a024c6638e9b',
                'map': '616045c6bf7a3c2516ebe856',
                'system': '61540c9adc0963494418542d',
                'createdAt': '2021-12-28T14:04:54.525Z',
                'updatedAt': '2021-12-28T17:00:00.003Z',
                'resultId': '61bb895359dbcc0e9c4c75e5',
                'resultCreatedAt': '2021-12-17T02:45:39+08:00',
                'assigneeName': 'Mohamed Bouazza',
                'systemName': 'WK System3',
                'customerName': 'Jera Corporation'
            }
        ],
            'totalDocs': 56,
            'limit': 100,
            'page': 1,
            'totalPages': 1,
            'pagingCounter': 1,
            'hasPrevPage': false,
            'hasNextPage': false,
            'prevPage': null,
            'nextPage': null
        });

    const res = await getTasksService(
      searchValue,
      ['Monitoring'],
      ['Done', 'Pending'],
      startDate,
      endDate,
      timeZone,
      page,
      size,
      paginate
    );
    expect(aggregateStub).to.have.been.calledOnce;

    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('object');
    expect(res.data.docs).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('expect to return No Data ', async () => {
    const searchValue = 'SP01 PR1';
    const startDate = moment('2020-11-20T17:00:00+08:00').format();
    const endDate = moment('2020-11-20T17:00:00+08:00').format();
    const timeZone = 'Asia/Taipei';
    const page = 0;
    const size = 10000;
    const paginate = true
    aggregateStub.returns([]);
    const res = await getTasksService(
      searchValue,
      ['Monitoring'],
      ['Done', 'Pending'],
      startDate,
      endDate,
      timeZone,
      page,
      size,
      paginate
    );

    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('no data');
  });
  it('Expect to throw an exception', async () => {
    const searchValue = 'SP01 PR1';
    const startDate = moment('2020-11-20T17:00:00+08:00').format();
    const endDate = moment('2020-11-20T17:00:00+08:00').format();
    const timeZone = 'Asia/Taipei';
    const page = 0;
    const size = 10000;
    aggregateStub.throws(new Error('Random error'));
      const res = await getTasksService( searchValue,
        ['Monitoring'],
        ['Done', 'Pending'],
        startDate,
        endDate,
        timeZone,
        page,
        size);
      expect(aggregateStub).to.have.been.calledOnce;
      expect(res).to.be.a('object');
      expect(res).to.have.property('err');
      expect(res).to.have.property('status');
      expect(res.err).to.be.a('error');
      expect(res.status).to.be.eq('error');
    });
});
