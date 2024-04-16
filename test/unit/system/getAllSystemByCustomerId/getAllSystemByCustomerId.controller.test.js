const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const fixture = require('./fixture.json');
const systemController = require('../../../../controllers/system.controller');
const systemService = require('../../../../services/system');

describe('controller get system by Customer test ', () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(systemService, 'getAllSystemByCustomerId');
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it('expect to send system by that ID', async () => {
    stubGetById.returns({
      data: fixture.all.success.body.data,
      status: 'success'
    });
    const customer = fixture.all.success.body.data.docs[0].customer;

    const req = {
      params: { customer_Id: customer },
      query: { page: 0, size: 10 }
    };

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getAllSystemByCustomerId(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customer_Id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.all.success.body.data
    });
  });
  it('expect to return an error - ID Does not exist', async () => {
    stubGetById.returns({
      err: { message: 'System not found' },
      status: 'error',
      statusCode: 404
    });
    const req = {
      body: {},
      params: { Id_Customer: '610d502489e61a36e88e1d27' },
      query: { page: 0, size: 2 }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getAllSystemByCustomerId(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customer_Id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: 'System not found'
    });
  });

  it('expect to return an error - Missing System ID in Query', async () => {
    stubGetById.returns({
      err: { message: 'Missing system ID' },
      status: 'error'
    });
    const req = {
      body: {},
      params: {},
      query: { page: 0, size: 2 }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getAllSystemByCustomerId(req, res);
    expect(stubGetById).to.be.calledWith(req.params.customer);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'Missing system ID'
    });
  });
});
