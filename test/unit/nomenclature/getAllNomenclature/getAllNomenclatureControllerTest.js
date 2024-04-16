const sinon = require('sinon');
const chai = require('chai');

const expect = require('chai').expect;
const sinonChai = require('sinon-chai');
const fixture = require('../fixture.json');
const nomenclatureController = require('../../../../controllers/nomenclature.controller');
const nomenclatureService = require('../../../../services/nomenclature');

chai.use(sinonChai);

describe('controller GET ALL Nomenclature test ', () => {
  let stubGetAll;

  beforeEach(() => {
    stubGetAll = sinon.stub(nomenclatureService, 'getAllNomenclature');
  });
  afterEach(() => {
    stubGetAll.restore();
  });
  it('expect to send all Nomenclature', async () => {
    stubGetAll.returns({
      data: fixture.arrayOfNomenclature,
      status: 'success'
    });
    const req = { body: {}, params: {}, query: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await nomenclatureController.getAllNomenclature(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayOfNomenclature
    });
  });
  it('expect to send all Nomenclature - intermediateShift ', async () => {
    stubGetAll.returns({
      data: fixture.arrayOfNomenclature,
      status: 'success'
    });
    const req = { body: {}, params: {}, query: { intermediateShift: 'true'} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await nomenclatureController.getAllNomenclature(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(req.query.intermediateShift).to.be.equal('true');
    expect(res.json).be.calledWith({
      data: fixture.arrayOfNomenclature
    });
  });
  it('expect to send all Nomenclature false false false', async () => {
    stubGetAll.returns({
      data: fixture.arrayOfNomenclature,
      status: 'success'
    });
    const req = { body: {}, params: {}, query: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await nomenclatureController.getAllNomenclature(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayOfNomenclature
    });
  });

  it('expect to send all Nomenclature route+post+ip', async () => {
    stubGetAll.returns({
      data: fixture.arrayOfNomenclature,
      status: 'success'
    });
    const req = {
      body: {},
      params: {},
      query: {},
      route: '/testing',
      method: 'post',
      ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await nomenclatureController.getAllNomenclature(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({
      data: fixture.arrayOfNomenclature
    });
  });

  it('expect to return an error', async () => {
    stubGetAll.returns({
      err: { message: 'get All nomenclature :' },
      status: 'error',
      statusCode: 400
    });

    const req = { body: {}, params: {}, query: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await nomenclatureController.getAllNomenclature(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'get All nomenclature :'
    });
  });
  it('expect to return an error - Invalid Status', async () => {
    stubGetAll.returns({
      err: { message: 'get All nomenclature :' },
      status: undefined,
      statusCode: 400
    });

    const req = { body: {}, params: {}, query: {} };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await nomenclatureController.getAllNomenclature(req, res);
    expect(stubGetAll).to.be.calledOnce;
  });
  it('expect to return an error route+post+ip', async () => {
    stubGetAll.returns({
      err: { message: 'get All nomenclature :' },
      status: 'error',
      statusCode: 400
    });

    const req = {
      body: {},
      params: {},
      query: {},
      route: '/testing',
      method: 'post',
      ip: '1234'
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await nomenclatureController.getAllNomenclature(req, res);
    expect(stubGetAll).to.be.calledOnce;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({
      message: 'get All nomenclature :'
    });
  });
});
