const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
chai.use(require('sinon-chai'));
const getTasksService = require('../../../../services/task/numberOfTasksByCriteria');
const Task = require('../../../../models/Task');
const moment = require('moment-timezone');
const fixture = require('./fixture.json')

chai.use(sinonChai);

describe('testing get all Tasks Filtred service', () => {
  let sandbox;
  let aggregateStub;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    aggregateStub = sandbox.stub(Task, 'aggregate');
  });

  afterEach(() => {
    sandbox.restore();
    aggregateStub.restore();
  });
  it('expect to return an success object', async () => {
    const searchValue = 'SP01 PR1';
    const startDate = moment('2021-11-20').format();
    const endDate = moment('2021-11-20').format();
    const timeZone = 'Asia/Taipei';
    aggregateStub.returns(fixture.data)

    const res = await getTasksService(
      searchValue,
      startDate,
      endDate,
      timeZone
    );
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('object');
    expect(res.status).to.be.eq('success');
  });

  it('expect to return No Data ', async () => {
    const searchValue = 'SP01 PR1';
    const startDate = moment('2020-11-20').format();
    const endDate = moment('2020-11-20').format();
    const timeZone = 'Asia/Taipei';
    aggregateStub.returns([]);
    const res = await getTasksService(
      searchValue,
      startDate,
      endDate,
      timeZone
    );

    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('no data');
  });
  it('Expect to throw an exception', async () => {
    const searchValue = 'SP01 PR1';
    const startDate = moment('2020-11-20').format();
    const endDate = moment('2020-11-20').format();
    const timeZone = 'Asia/Taipei';
    aggregateStub.throws(new Error('Random error'));
      const res = await getTasksService( searchValue,
        startDate,
        endDate,
        timeZone);
      expect(aggregateStub).to.have.been.calledOnce;
      expect(res).to.be.a('object');
      expect(res).to.have.property('err');
      expect(res).to.have.property('status');
      expect(res.err).to.be.a('error');
      expect(res.status).to.be.eq('error');
    });
});
