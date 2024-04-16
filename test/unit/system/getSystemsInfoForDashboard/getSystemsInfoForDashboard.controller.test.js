const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const fixture = require('./fixture.json');
const systemController = require('../../../../controllers/system.controller');
const systemService = require('../../../../services/system');

describe('GET  Systems Info For Dashboard Controller TEST ', () => {
  let stubGetSystemsInfo
  beforeEach(() => {
    stubGetSystemsInfo = sinon.stub(systemService, 'getSystemsInfoForDashboard');
  });
  afterEach(() => {
    stubGetSystemsInfo.restore();
  });
  it('Expect to return success', async () => {
    stubGetSystemsInfo.returns({
      data: fixture.systemsInfo,
      status: 'success'
    });
    const req = {
      body: {},
      params: { customerId: fixture.customerID }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getSystemsInfoForDashboard(req, res);
    expect(stubGetSystemsInfo).to.be.calledWith(req.params.customerId);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.systemsInfo
    });
  });

  it('Expect to return an error - 400 Error', async () => {
    stubGetSystemsInfo.returns({
      err: { message: 'an error has occurred' },
      status: 'error'
    });
    const req = {
      body: {},
      params: { customerId: fixture.customerID }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getSystemsInfoForDashboard(req, res);
    expect(stubGetSystemsInfo).to.be.calledWith(req.params.customerId);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: 'an error has occurred' });
  });
});
