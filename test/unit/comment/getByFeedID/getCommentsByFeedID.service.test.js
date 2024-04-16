const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('../fixture.json');
const getCommentsByFeedID = require('../../../../services/comment/getCommentsByFeedID.service');
const Comment = require('../../../../models/Comment');

chai.use(sinonChai);
describe('Get Comment By Feed ID service TEST', () => {
  let findStub;
  const sandbox = sinon.createSandbox();
  beforeEach(() => {
    findStub = sandbox.stub(Comment, 'find');
  });
  afterEach(() => {
    findStub.restore();
  });
  it('Expect to return a success', async () => {
    findStub.returns({
      populate: sandbox.stub().returns(fixture.documents)
    });
    const res = await getCommentsByFeedID();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('statusCode');
    expect(res.statusCode).to.be.equal(200);
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('success');
    expect(res).to.have.property('data');
    expect(res.data).to.be.a('array');
    expect(res.data[0]).to.have.keys(['_id', 'content', 'createdAt', 'updatedAt', '__v', 'isActive', 'user', 'feed']);
    expect(res.data[0].user).to.have.keys(['_id', 'firstName', 'lastName', 'avatar']);
  });

  it('Expect to return a success - No Content Found 204', async () => {
    findStub.returns({
      populate: sandbox.stub().returns([])
    });
    const res = await getCommentsByFeedID();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('statusCode');
    expect(res.statusCode).to.be.equal(204);
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('success');
    expect(res).to.have.property('err');
    expect(res.err).to.be.a('object');
    expect(res.err).to.have.property('message');
    expect(res.err.message).to.be.eq('No Comments found for this newsfeed ID !');
  });

  it('Expect to return an error', async () => {
    findStub.throws(new Error('Random error'));
    const res = await getCommentsByFeedID();
    expect(findStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });

});
