const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const fixture = require('./fixture.json');
const customerController = require('../../../../controllers/customer.controller');
const customerService = require('../../../../services/customer');

describe('GET Customers Info For Dashboard Controller TEST', () => {
  let stubGetInfo;
  beforeEach(() => {
    stubGetInfo = sinon.stub(
      customerService,
      'getCustomersInfoForDashboardService'
    );
  });
  afterEach(() => {
    stubGetInfo.restore();
  });
  it('expect to send all customer ', async () => {
    stubGetInfo.returns({
      data: fixture.customersInfo,
      status: 'success'
    });
    const req = { body: {}, params: {}, query: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerController.getCustomersInfoForDashboard(req, res);
    expect(stubGetInfo).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.customersInfo,
        status: 'success'
    });
  });

  it('expect to return an error', async () => {
    stubGetInfo.returns({
      err: { message: 'An error message' },
      status: 'error'
    });
    const isActive = true;
    const req = { body: {}, params: {}, query: { page: 0, size: 2, isActive } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerController.getCustomersInfoForDashboard(req, res);
    expect(stubGetInfo).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      err: { message: 'An error message' },
      status: 'error'
    });
  });
});
