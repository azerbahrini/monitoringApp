const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('./fixture.json');
const getWithoutResultForm = require('../../../../services/resultForm/getMonitoringActivitiesWithoutResultForm.service');
const ResultForm = require('../../../../models/ResultForm');
const monitoringActivityService = require('../../../../services/monitoringActivity');

chai.use(sinonChai);
describe('GET Monitoring Acts Without Result Form Service TEST', () => {
  const sandbox = sinon.createSandbox();
  let getAllResultFormStub;
  let getAllActStub;
  beforeEach(() => {
    getAllResultFormStub = sandbox.stub(ResultForm, 'paginate');
    getAllActStub = sandbox.stub(
      monitoringActivityService,
      'getAllMonitoringActivityService'
    );
  });
  afterEach(() => {
    getAllResultFormStub.restore();
    getAllActStub.restore();
  });
  it('Expect to return an success object', async () => {
    getAllResultFormStub.returns(fixture.resultForm);
    getAllActStub.returns(fixture.monitorindActivity);
    const res = await getWithoutResultForm();
    expect(getAllResultFormStub).to.have.been.calledOnce;
    expect(getAllActStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('Expect to throw an exception', async () => {
    getAllResultFormStub.throws(new Error('Random error'));
    getAllActStub.returns(fixture.monitorindActivity);
    const res = await getWithoutResultForm();
    expect(getAllResultFormStub).to.have.been.calledOnce;
    expect(getAllActStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
    expect(res.err.stack).to.be.a('string');
  });
});
