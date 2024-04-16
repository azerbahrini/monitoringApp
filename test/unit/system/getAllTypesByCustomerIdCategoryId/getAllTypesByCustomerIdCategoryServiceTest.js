const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const {app} = require('../../../../server');
const fixture = require('../fixture.json');
const getAllTypesByCustomerIdCategoryId = require('../../../../services/system/getAllTypesByCustomerIdCategoryId');
const System = require('../../../../models/System');
chai.use(sinonChai);
describe('GET ALL Types By Customers service', () => {
  const sandbox = sinon.createSandbox();
  let findStub;
  beforeEach(() => {
    findStub = sandbox.stub(System, 'find');
  });
  afterEach(() => {
    findStub.restore();
  });
  it('Expect to return an success object', async () => {
    const arrayoftypesSystems = [
      {
        _id: '608be0f0c5a2a0bd397294aa',
        type: 'PRD'
      },
      {
        _id: '608be0f0c5a2a0bd397294aa',
        type: 'PRD'
      },
      {
        _id: '608be0f0c5a2a0bd397294aa',
        type: 'PRD'
      }
    ];
    findStub.returns(arrayoftypesSystems);
    findStub.returns({
      populate: sandbox.stub().returns({
        lean: sandbox.stub().returns({
          exec: () => arrayoftypesSystems
        })
      })
    });
    const res = await getAllTypesByCustomerIdCategoryId(
      '608bde23c5a2a0a1607294a5',
      '608be4b7c5a2a005c87294b1'
    );
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('Expect to return an empty object', async () => {
    const arrayoftypesSystems = [];

    findStub.returns({
      populate: sandbox.stub().returns(arrayoftypesSystems)
    });
    const res = await getAllTypesByCustomerIdCategoryId(
      '608bde23c5a2a0a1607294a5',
      '608be4b7c5a2a005c87294b1'
    );
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res).to.have.property('statusCode');
    expect(res.err).to.have.property('message');
    expect(res.err.message).to.be.eq('No Types match this criteria !');
    expect(res.err).to.be.a('object');
    expect(res.status).to.be.eq('error');
    expect(res.statusCode).to.be.eq(404);
  });

  it('testhere', async () => {
    const arrayoftypesSystems = [
      {
        _id: '608be0f0c5a2a0bd397294aa',
        type: 'PRD'
      },
      {
        _id: '608be0f0c5a2a0bd397294aa',
        type: 'PRD'
      },
      {
        _id: '608be0f0c5a2a0bd397294aa',
        type: 'PRD'
      }
    ];

    findStub.returns({
      populate: sandbox.stub().returns(arrayoftypesSystems)
    });
    const res = await getAllTypesByCustomerIdCategoryId(
      '608bde23c5a2a0a1607294a5',
      '608be4b7c5a2a005c87294b1'
    );
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('data');
    expect(res).to.have.property('status');
    expect(res.data).to.be.a('array');
    expect(res.status).to.be.eq('success');
  });

  it('Expect to throw an exception', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getAllTypesByCustomerIdCategoryId(
      '608bde23c5a2a0a1607294a5'
    );
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });
});
