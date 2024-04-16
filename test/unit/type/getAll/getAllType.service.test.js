const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('../fixture.json');
const getAllTypeService = require('../../../../services/type/getAll');
const Type = require('../../../../models/Type');

chai.use(sinonChai);

describe('GET ALL Type service', () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(Type, 'paginate');
  });
  afterEach(() => {
    findStub.restore();
  });
  it('Expect to return an success object', async () => {
    findStub.returns(fixture.arrayofTypes)

    const res = await getAllTypeService();
    expect(findStub).to.have.been.calledOnce;
    expect(findStub).to.be.calledWith();
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });
  it('Expect to return an success object + searchValue', async () => {
    findStub.returns(fixture.arrayofTypes)

    const res = await getAllTypeService(null, null, null, 'searchValue');
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
    const res = await getAllTypeService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
