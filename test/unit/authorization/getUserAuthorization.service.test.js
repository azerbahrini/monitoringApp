const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const AuthService = require('../../../services/authorization/getUserAuthorization');
const Shift = require('../../../models/Shift');
const fixture = require('./fixture.json');

chai.use(sinonChai);
describe('get User Authrization service Test', () => {
  const sandbox = sinon.createSandbox();
  const userID = '61796b50032f036a48db8a54';
  let aggregateStub;
  beforeEach(() => {
    aggregateStub = sandbox.stub(Shift, 'aggregate');
  });
  afterEach(() => {
    aggregateStub.restore();
  });
  it('expect to return an success object', async () => {
    aggregateStub.returns(fixture.permissions);

    const res = await AuthService.getRolesPermission(userID);
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('expect to throw an exception', async () => {
    aggregateStub.throws(new Error('Error'));
    const res = await AuthService.getRolesPermission(userID);
    expect(aggregateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
