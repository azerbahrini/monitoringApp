const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const fixture = require('../fixture2.json');
const systemController = require('../../../../controllers/system.controller');
const systemService = require('../../../../services/system');
describe('controller add System by id test ', () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(systemService, 'addSystemService');
  });
  afterEach(() => {
    stubAdd.restore();
  });

  it('send a correct type object ', async () => {
    stubAdd.returns({
      data: fixture.SystemDataTest,
      status: 'success'
    });
    const req = {
      body: {
        ...fixture.SystemDataTestWithoutID
      },
      params: {}
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.addSystemController(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).be.calledWith({
      data: fixture.SystemDataTest
    });
  });

  it('send a wrong data form - Missing Property', async () => {
    stubAdd.returns({
      err: { message: 'missing property' },
      status: 'error'
    });
    const req = {
      body: { isActive: fixture.SystemDataTest.isActive },
      params: {}
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.addSystemController(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'missing property'

    });
  });

  it('send a wrong data form - Missing Property + StatusCode', async () => {
    stubAdd.returns({
      err: { message: 'missing property' },
      status: 'error',
      statusCode: 400
    });
    const req = {
      body: { isActive: fixture.SystemDataTest.isActive },
      params: {}
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await systemController.addSystemController(req, res);
    expect(stubAdd).to.be.calledWith(req.body);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'missing property'
    });
  });

});
