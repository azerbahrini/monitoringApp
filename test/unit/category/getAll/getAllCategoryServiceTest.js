const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('./fixture.json');
const getAllCategoryService = require('../../../../services/category/getAll');

const Category = require('../../../../models/Category');

chai.use(sinonChai);

describe('testing get all Category service', () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(Category, 'paginate');
  });
  afterEach(() => {
    findStub.restore();
  });

  it('expect to return an success object', async () => {
    findStub.returns(fixture.all.success.body.data);
    const res = await getAllCategoryService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('object');
    expect(res.data).to.have.property('docs');
    expect(res.data.docs).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('expect to return an success object + Search Value', async () => {
    findStub.returns(fixture.all.success.body.data);
    const res = await getAllCategoryService(null, null, null, 'Category Name');
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('object');
    expect(res.data).to.have.property('docs');
    expect(res.data.docs).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('Expect to throw an exception', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getAllCategoryService();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });

});
