const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);
const fixture = require('../fixture.json');
const customerController = require('../../../../controllers/customer.controller');
const customerService = require('../../../../services/customer');

describe('controller get customer by id test ', () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(customerService, 'getCustomerByIdService');
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it('expect to send customer  by that ID', async () => {
    stubGetById.returns({
      data: fixture.customerDataTest,
      status: 'success'
    });
    const req = {
      body: {},
      query: {
        timeZone: 'Europe/London'
      },
      params: { id: fixture.customerDataTest._id }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerController.getCustomerById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id, [{ path: 'listMonitoringType', select: 'libelle' }]);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.customerDataTest
    });
  });
  it('expect to return an error - ID Does not exist', async () => {
    stubGetById.returns({
      err: { message: 'customer not found' },
      status: 'error',
      statusCode: 404
    });
    const req = {
      body: {},
      params: { id: fixture.wrongID }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await customerController.getCustomerById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id, [{ path: 'listMonitoringType', select: 'libelle'}]);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: 'customer not found'
    });
  });
});
