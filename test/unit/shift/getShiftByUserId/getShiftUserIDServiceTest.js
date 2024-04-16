const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('./fixture.json');
const getShiftByUserIDService = require('../../../../services/shift/getShiftByUserIDService');
const Shift = require('../../../../models/Shift');

chai.use(sinonChai);

describe('GET shift By User Id service', () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(Shift, 'findOne');
  });
  afterEach(() => {
    findStub.restore();
  });
  it('Expect to return an success object', async () => {
    findStub.returns(fixture.all.success.body.data);
    const res = await getShiftByUserIDService(fixture.all.success.body.data.user);
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res).to.be.a('object');
    expect(res.status).to.be.eq('success');
  });

  it('Expect to return a 203 - not authorized', async () => {
    findStub.returns(null);
    const teamLeaderRoleID = '5fa02d8f785e4681ddfa3a70';
    const res = await getShiftByUserIDService(fixture.all.success.body.data.user, teamLeaderRoleID);
    expect(res).to.be.a('object');
    expect(res).to.have.property('statusCode');
    expect(res).to.have.property('status');
    expect(res).to.have.property('err');
    expect(res.statusCode).to.be.eq(203);
    expect(res.status).to.be.eq('error');
    expect(res.err).to.be.a('object');
    expect(res.err).to.have.property('message');
    expect(res.err.message).to.be.eq('You are not authorized');
    expect(findStub).to.have.been.calledOnce;
  });

  it('Expect to return a 204 success', async () => {
    findStub.returns(null);
    const res = await getShiftByUserIDService(fixture.all.success.body.data.user);
    expect(res).to.be.a('object');
    expect(res).to.have.property('statusCode');
    expect(res).to.have.property('status');
    expect(res).to.have.property('data');
    expect(res.status).to.be.eq('success');
    expect(res.statusCode).to.be.eq(204);
  });

  it('Expect to throw an exception', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getShiftByUserIDService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
