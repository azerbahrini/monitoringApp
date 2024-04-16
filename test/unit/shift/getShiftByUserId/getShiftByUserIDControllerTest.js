const sinon = require('sinon');
const expect = require('chai').expect;
const sinonChai = require('sinon-chai');
const chai = require('chai');
chai.use(sinonChai);
const fixture = require('./fixture.json');
const shiftController = require('../../../../controllers/shift.controller');
const shiftService = require('../../../../services/shift');

describe('controller get shift By User test ', () => {
  let stubGetById;
  beforeEach(() => {
    stubGetById = sinon.stub(shiftService, 'getShiftByUserIDService');
  });
  afterEach(() => {
    stubGetById.restore();
  });
  it('expect to send shift by that ID', async () => {
    stubGetById.returns(fixture.result);
    const userID = fixture.all.success.body.data.user;
    const req = {
      body: {},
      params: { id: userID }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await shiftController.getShiftByUserID(req, res);
    expect(stubGetById).to.be.calledWith(userID);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({ data: fixture.result.data });
  });
 it('expect to send shift by that ID + Status Code', async () => {
    stubGetById.returns({...fixture.result, statusCode: 200});
    const userID = fixture.all.success.body.data.user;
    const req = {
      body: {},
      params: { id: userID }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await shiftController.getShiftByUserID(req, res);
    expect(stubGetById).to.be.calledWith(userID);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).be.calledWith({ data: fixture.result.data });
  });

  it('expect to return an error - 404', async () => {
    stubGetById.returns({
        status: 'error',
        statusCode: 404,
        err: {
            message: 'shift not found'
        }
    });
    const userID = fixture.all.success.body.data.user;
    const req = {
      body: {},
      params: { id: userID }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await shiftController.getShiftByUserID(req, res);
    expect(stubGetById).to.be.calledWith(userID);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).be.calledWith({ message: 'shift not found' });
  });

  it('expect to return an error - 400', async () => {
    stubGetById.returns({
        status: 'error',
        err: {
            message: 'an error has occured'
        }
    });
    const userID = fixture.all.success.body.data.user;
    const req = {
      body: {},
      params: { id: userID }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await shiftController.getShiftByUserID(req, res);
    expect(stubGetById).to.be.calledWith(userID);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).be.calledWith({ message: 'an error has occured' });
  });
});
