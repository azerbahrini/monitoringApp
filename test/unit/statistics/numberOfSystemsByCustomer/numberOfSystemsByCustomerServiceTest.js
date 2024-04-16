const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const numberOfSystemsByCustomerService = require('../../../../services/statistics/numberOfSystemsByCustomer');
const System = require('../../../../models/System');

chai.use(sinonChai);

describe('Number Of Systems By Customer Service TEST ', () => {
  const sandbox = sinon.createSandbox();
  const startDate = '2022-01-17T00:00:00.000Z';
  const endDate = '2022-01-19T00:00:00.000Z';
  const customerID = '608beed8c5a2a0c3017294b9';
  const timeZone = 'America/Los_Angeles'

  let aggregateStub;
  beforeEach(() => {
    aggregateStub = sandbox.stub(System, 'aggregate');
  });
  afterEach(() => {
    aggregateStub.restore();
  });
  it('Expect to return an success object', async () => {
    aggregateStub.returns({'number Of Systems': 1});
    const res = await numberOfSystemsByCustomerService(
      startDate,
      endDate,
      customerID,
      timeZone
    );
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res).to.have.property('statusCode');
    expect(res.data).to.be.a('object');
    expect(res.status).to.be.eq('success');
    expect(res.statusCode).to.be.eq(200);
  });

  it('Expect to return an success 204', async () => {
    aggregateStub.returns([]);
    const res = await numberOfSystemsByCustomerService(
      startDate,
      endDate,
      customerID,
      timeZone
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
    const res = await numberOfSystemsByCustomerService(
      startDate,
      endDate,
      customerID,
      timeZone
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
