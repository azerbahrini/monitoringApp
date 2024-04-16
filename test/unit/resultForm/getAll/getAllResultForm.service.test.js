const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('../fixture.json');
const getAllResultForm = require('../../../../services/resultForm/getAllResultForm.service');
const ResultForm = require('../../../../models/ResultForm');

chai.use(sinonChai);
describe('GET ALL Result Form service', () => {
    const sandbox = sinon.createSandbox();
    let findStub;
    const size = fixture.size;
    const page = fixture.page;
    const paginate= true;
    const options = {
      offset: page * size,
      limit: size,
      pagination: paginate
    };
    beforeEach(() => {
      findStub = sandbox.stub(ResultForm, 'paginate');
    });
    afterEach(() => {
      findStub.restore();
    });
    it('Expect to return an success object', async () => {
      findStub.returns(fixture.arrayOfResultForm);
      const res = await getAllResultForm(options);
      expect(findStub).to.have.been.calledOnce;
      expect(findStub).to.be.calledWith();
      expect(res).to.be.a('object');
      expect(res).to.have.property('data');
      expect(res).to.have.property('status');
      expect(res.data).to.be.a('array');
      expect(res.status).to.be.eq('success');
    });
    it('Expect to return an success object + search Value', async () => {
      findStub.returns(fixture.arrayOfResultForm);
      const res = await getAllResultForm(null, null, null, 'result form name');
      expect(findStub).to.have.been.calledOnce;
      expect(findStub).to.be.calledWith();
      expect(res).to.be.a('object');
      expect(res).to.have.property('data');
      expect(res).to.have.property('status');
      expect(res.data).to.be.a('array');
      expect(res.status).to.be.eq('success');
    });
    it('Expect to throw an exception', async () => {
      findStub.throws(new Error('Random error'));
      const res = await getAllResultForm();
      expect(findStub).to.have.been.calledOnce;
      expect(res).to.be.a('object');
      expect(res).to.have.property('err');
      expect(res).to.have.property('status');
      expect(res.err).to.be.a('error');
      expect(res.status).to.be.eq('error');
    });
  });
