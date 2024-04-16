const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('../fixture.json');
const getCommentsByUserID = require('../../../../services/comment/getCommentsByUserID.service');
const Comment = require('../../../../models/Comment');

chai.use(sinonChai);
describe('Get Comment By User ID service TEST', () => {
  let findStub;
  const sandbox = sinon.createSandbox();
  beforeEach(() => {
    findStub = sandbox.stub(Comment, 'find');
  });
  afterEach(() => {
    findStub.restore();
  });
  it('Expect to return a success', async () => {
    findStub.returns(fixture.documents);
    const res = await getCommentsByUserID();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('statusCode');
    expect(res.statusCode).to.be.equal(200);
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('success');
    expect(res).to.have.property('data');
    expect(res.data).to.be.a('array');
    expect(res.data[0]).to.have.keys(['_id', 'content', 'createdAt', 'updatedAt', '__v', 'isActive', 'user', 'feed']);
  });

  it('Expect to return a success - No Content Found 204', async () => {
    findStub.returns([]);
    const res = await getCommentsByUserID();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('statusCode');
    expect(res.statusCode).to.be.equal(204);
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('success');
    expect(res).to.have.property('err');
    expect(res.err).to.be.a('object');
    expect(res.err).to.have.property('message');
    expect(res.err.message).to.be.eq('No Comments found for this User ID !');
  });

  it('Expect to return an error', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getCommentsByUserID();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
    expect(res.err.message).to.be.eq('Random error');
    expect(res.statusCode).to.be.eq(400);
  });

});
