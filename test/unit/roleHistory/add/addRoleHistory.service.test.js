const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('../fixture.json');
const addRoleHistoryService = require('../../../../services/roleHistory/add');
const RoleHistory = require('../../../../models/RoleHistory');

chai.use(sinonChai);

describe(' add RoleHistorye service', () => {
  let createStub;
  const sandbox = sinon.createSandbox();
  beforeEach(() => {
    createStub = sandbox.stub(RoleHistory, 'create');
  });
  afterEach(() => {
    createStub.restore();
  });
  it('Expect to return an success object', async () => {
    createStub.returns(fixture.roleHistoryDataTestWithoutID);

    const res = await addRoleHistoryService(fixture.roleDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('object');
    expect(res.status).to.be.eq('success');
  });
  it('Expect to return an success object - adding random property ', async () => {
    createStub.returns(fixture.wrongRoleHistoryDataTest);

    const res = await addRoleHistoryService(fixture.wrongRoleHistoryDataTest);
    expect(createStub).to.have.been.calledOnce;
    expect(createStub).to.be.calledWith(fixture.wrongRoleHistoryDataTest);
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('object');
    expect(res.status).to.be.eq('success');
  });

  it('Expect to return an error', async () => {
    createStub.throws(new Error('Error'));

    const res = await addRoleHistoryService(fixture.roleDataTestWithoutID);
    expect(createStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
    expect(res.err.message).to.be.eq('Error');
    expect(res.err.name).to.be.eq('Error');
    expect(res.err.stack).to.be.a('string');
  });

});
