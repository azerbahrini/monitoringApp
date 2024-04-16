const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('./fixture.json');
const getCustomersInfoForDashboardService = require('../../../../services/customer/getCustomersInfoForDashboard.service');
const Customer = require('../../../../models/Customer');

chai.use(sinonChai);

describe('GET Customers Info For Dashboard Service TEST', () => {
  const sandbox = sinon.createSandbox();
  let aggregateStub;
  beforeEach(() => {
    aggregateStub = sandbox.stub(Customer, 'aggregate');
  });
  afterEach(() => {
    aggregateStub.restore();
  });
  it('Expect to return an success object', async () => {
    aggregateStub.returns(fixture.customersInfo);
    const res = await getCustomersInfoForDashboardService();
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('Expect to throw an exception', async () => {
    aggregateStub.throws(new Error('Random error'));
    const res = await getCustomersInfoForDashboardService();
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
