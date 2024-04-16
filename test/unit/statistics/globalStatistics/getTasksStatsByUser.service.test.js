const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const fixture = require('./fixture.json');
const getTasksStatsByUserService = require('../../../../services/statistics/getTasksStatsByUser.service');
const Task = require('../../../../models/Task');

chai.use(sinonChai);

describe('getTasksStatsBy User ID Service TEST ', () => {
  const sandbox = sinon.createSandbox();
  const startDate = '2022-01-17T00:00:00.000Z';
  const endDate = '2022-01-19T00:00:00.000Z';
  const customerID = null;
  const systemID = '608beed8c5a2a0c3017294b9';
  const UserID = '5c7b8f8c9f8f7a0c3017294b';
  let aggregateStub;
  beforeEach(() => {
    aggregateStub = sandbox.stub(Task, 'aggregate');
  });
  afterEach(() => {
    aggregateStub.restore();
  });
  it('Expect to return an success object', async () => {
    aggregateStub.returns(fixture.result);
    const res = await getTasksStatsByUserService(
      UserID,
      startDate,
      endDate,
      customerID,
      systemID
    );
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res).to.have.property('statusCode');
    expect(res.data).to.be.a('object');
    expect(res.data).to.have.property('tasks');
    expect(res.data).to.have.property('stats');
    expect(res.data.tasks).to.be.a('array');
    expect(res.data.tasks[0]).to.have.keys('state', 'createdAt', 'updatedAt');
    expect(res.data.tasks[0].state).to.be.a('string');
    expect(res.status).to.be.eq('success');
    expect(res.statusCode).to.be.eq(200);
  });
  it('Expect to return an success object + no filters', async () => {
    aggregateStub.returns(fixture.result);
    const res = await getTasksStatsByUserService(
      UserID,
      startDate,
      endDate,
      null,
      null
    );
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res).to.have.property('statusCode');
    expect(res.data).to.be.a('object');
    expect(res.data).to.have.property('tasks');
    expect(res.data).to.have.property('stats');
    expect(res.data.tasks).to.be.a('array');
    expect(res.data.tasks[0]).to.have.keys('state', 'createdAt', 'updatedAt');
    expect(res.data.tasks[0].state).to.be.a('string');
    expect(res.status).to.be.eq('success');
    expect(res.statusCode).to.be.eq(200);
  });
  it('Expect to return an success 204', async () => {
    aggregateStub.returns([]);
    const res = await getTasksStatsByUserService(
      UserID,
      startDate,
      endDate,
      customerID,
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
    const res = await getTasksStatsByUserService(
      UserID,
      startDate,
      endDate,
      customerID,
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
