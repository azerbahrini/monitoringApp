const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('./fixture.json');
const getSystemsInfoForDashboardService = require('../../../../services/system/getSystemsInfoForDashboard');
const System = require('../../../../models/System');

chai.use(sinonChai);

describe('GET Systems Info For Dashboard Service TEST', () => {
  const sandbox = sinon.createSandbox();
  let aggregateStub;
  beforeEach(() => {
    aggregateStub = sandbox.stub(System, 'aggregate');
  });
  afterEach(() => {
    aggregateStub.restore();
  });
  it('Expect to return an success object', async () => {
    aggregateStub.returns(fixture.systemsInfo);
    const res = await getSystemsInfoForDashboardService();
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });
  it('Expect to return an success - 204 code - no data found', async () => {
    aggregateStub.returns([]);
    const res = await getSystemsInfoForDashboardService();
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('success');
    expect(res).to.have.property('statusCode');
    expect(res).to.have.property('error');
    expect(res.statusCode).to.be.eq(204);
    expect(res.error).to.be.a('object');
    expect(res.error).to.have.property('message');
    expect(res.error.message).to.be.eq('No systems info was found');
  });

  it('Expect to throw an exception', async () => {
    aggregateStub.throws(new Error('Random error'));
    const res = await getSystemsInfoForDashboardService();
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('error');
    expect(res).to.have.property('status');
    expect(res.error).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
