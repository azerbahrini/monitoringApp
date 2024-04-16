const sinon = require('sinon');
const expect = require('chai').expect;
const fixture = require('../fixture.json');
const mapController = require('../../../../controllers/map.controller');
const mapService = require('../../../../services/map');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('controller get system by id test ', () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(mapService, 'getMAPById');
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it('expect to send Map by that ID', async () => {
    stubGetById.returns({
      data: fixture.MapDataTest,
      status: 'success'
    });
    const req = {
      body: {},
      query: {
        timeZone: 'Africa/tunis'
      },
      params: { id: fixture.MapDataTest._id }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.getMapById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.MapDataTest
    });
  });

  it('expect to return an error - Invalid Status', async () => {
    stubGetById.returns({
      err: { message: 'invalidStatus' },
      status: 'invalidStatus'
    });
    const req = {
      body: {},
      query: {
        timeZone: 'Africa/tunis'
      },
      params: { id: fixture.MapDataTest._id }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.getMapById(req, res);
    expect(stubGetById).to.be.calledOnce;
  });

  it('expect NOT to send Map by that ID', async () => {
    stubGetById.returns({
      err: { message: '400 error' },
      status: 'error'
    });
    const req = {
      body: {},
      query: {
        timeZone: 'Africa/tunis'
      },
      params: { id: fixture.MapDataTest._id }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.getMapById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: '400 error'
    });
    expect(res).to.be.a('object');
    expect(res).to.have.property('status');
    expect(res).to.have.property('json');
  });

  it('expect to return an error - ID Does not exist', async () => {
    stubGetById.returns({
      err: { message: 'Map not found' },
      status: 'error',
      statusCode: 404
    });
    const req = {
      body: {},
      query: {
        timeZone: 'Africa/tunis'
      },
      params: { id: fixture.wrongID }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await mapController.getMapById(req, res);
    expect(stubGetById).to.be.calledWith(req.params.id);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({
      message: 'Map not found'
    });
  });
});
