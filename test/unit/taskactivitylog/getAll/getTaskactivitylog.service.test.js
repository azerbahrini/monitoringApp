const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const fixture = require('./fixture.json');
const getTaskActivityLogs = require('../../../../services/taskActivityLog/getTaskActivityLogs.service');
const TaskActivityLog = require('../../../../models/TaskActivityLog');

chai.use(sinonChai);

describe('GET TaskActivityLog service', () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(TaskActivityLog, 'find');
  });
  afterEach(() => {
    findStub.restore();
  });
  it('Expect to return an success object', async () => {
    findStub.returns(fixture.foundTaskActivityLogs);
    const res = await getTaskActivityLogs();
    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('success');
    expect(res).to.have.property('data');
    expect(res.data).to.be.a('array');
    expect(res.data[0]).to.have.keys('shift', 'result', '_id', '__v');
  });

  it('Expect to return 204 error - no data found', async () => {
    findStub.returns([]);
    const res = await getTaskActivityLogs();
    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.property('statusCode');
    expect(res.status).to.be.eq('success');
    expect(res).to.have.property('err');
    expect(res.err.message).to.be.eq('No data found');
    expect(res.statusCode).to.be.eq(204);
  });

  it('Expect to throw an exception', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getTaskActivityLogs();
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
