const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const fixture = require('../fixture.json');
const systemController = require('../../../../controllers/system.controller');
const systemService = require('../../../../services/system');

describe('GET BY ID system Controller ', () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(systemService, 'getSystemByIdService');
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it('Expect to send system by that ID', async () => {
    stubGetById.returns({
      data: fixture.SystemDataTest,
      status: 'success'
    });
    const req = {
      body: {},
      params: { id: fixture.SystemDataTest._id }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getSystemByIdController(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.SystemDataTest
    });
  });
  it('Expect to return an error - ID Does not exist', async () => {
    stubGetById.returns({
      err: { message: 'system not found' },
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
    await systemController.getSystemByIdController(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({ message: 'system not found' });
  });

  it('Expect to return an error - 400 Error', async () => {
    stubGetById.returns({
      err: { message: 'an error has occurred' },
      status: 'error'
    });
    const req = {
      body: {},
      params: { id: fixture.wrongID }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.getSystemByIdController(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: 'an error has occurred' });
  });

});
