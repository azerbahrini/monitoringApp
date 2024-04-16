const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

const fixture = require('../fixture.json');
const deleteComment = require('../../../../services/comment/deleteComment.service');
const Comment = require('../../../../models/Comment');

chai.use(sinonChai);
describe('Delete Comment service TEST', () => {
  let updateStub;
  const sandbox = sinon.createSandbox();
  beforeEach(() => {
    updateStub = sandbox.stub(Comment, 'findOneAndUpdate');
  });
  afterEach(() => {
    updateStub.restore();
  });
  it('Expect to return a success', async () => {
    updateStub.returns({
      lean: sandbox.stub().returns({
        exec: () => fixture.updatedComment
      })
    });
    const res = await deleteComment(fixture.document._id);
    expect(updateStub).to.have.been.calledOnce;
    expect(updateStub).to.be.calledWith({_id: fixture.document._id});
    expect(res).to.be.a('object');
    expect(res).to.have.property('statusCode');
    expect(res.statusCode).to.be.equal(200);
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('success');
    expect(res).to.have.property('data');
    expect(res.data).to.be.a('object');
    expect(res.data.isActive).to.be.eq(false);
    expect(res.data).to.have.keys(['_id', 'content', 'createdAt', 'updatedAt', '__v', 'isActive', 'user', 'feed']);
  });

  it('Expect to return an Error - 404 not found', async () => {
    updateStub.returns({
      lean: sandbox.stub().returns({
        exec: () => null
      })
    });
    const res = await deleteComment(fixture.invalidID);
    expect(updateStub).to.have.been.calledOnce;
    expect(updateStub).to.be.calledWith({_id: fixture.invalidID});
    expect(res).to.be.a('object');
    expect(res).to.have.property('statusCode');
    expect(res.statusCode).to.be.equal(404);
    expect(res).to.have.property('status');
    expect(res.status).to.be.eq('error');
    expect(res).to.have.property('err');
    expect(res.err).to.be.a('object');
    expect(res.err).to.have.property('message');
    expect(res.err.message).to.be.eq('Comment not found.');
  });

  it('Expect to return an error', async () => {
    updateStub.throws(new Error('Random error'));
    const res = await deleteComment(fixture.documentWithoutID);
    expect(updateStub).to.have.been.calledOnce;
    expect(res).to.be.a('object');
    expect(res).to.have.property('err');
    expect(res).to.have.property('status');
    expect(res.err).to.be.a('error');
    expect(res.status).to.be.eq('error');
  });

});
