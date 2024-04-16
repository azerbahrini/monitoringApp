const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const fixture = require('../fixture.json');
const commentController = require('../../../../controllers/comment.controller');
const commentService = require('../../../../services/comment');

const header = () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3OTZiNTAwMzJmMDM2YTQ4ZGI4YTU0In0sImlhdCI6MTY0MTgxNDM0NCwiZXhwIjoxNjQxODUwMzQ0fQ.FW8BZce46bNwbzhXE6VXnZ_sfZKqBEAqhzqqIaSVaQw';
  return token;
};
const invalidHeader = () => {
  const token = 'invalid Token';
  return token;
};
describe('controller POST Client by id test ', () => {
  let stubAdd;
  beforeEach(() => {
    stubAdd = sinon.stub(commentService, 'addComment');
  });
  afterEach(() => {
    stubAdd.restore();
  });
  it('expect to return success ', async () => {
    stubAdd.returns({
      data: fixture.document,
      status: 'success'
    });

    const req = {
      body: fixture.documentWithoutID,
      params: { id: fixture.document._id },
      header
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await commentController.addComment(req, res);
    expect(stubAdd).to.be.calledWith(fixture.addedComent);
    expect(res.json).be.calledWith({
      message: 'Successfully added the comment',
      data: fixture.document
    });
  });

  it('expect to return an error ', async () => {
    stubAdd.returns({
      err: { message: 'error' },
      status: 'error'
    });

    const req = {
      body: fixture.documentWithoutID,
      params: { id: fixture.document._id },
      header
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await commentController.addComment(req, res);
    expect(stubAdd).to.be.calledWith(fixture.addedComent);
    expect(res.json).be.calledWith({ status: 'error', message: 'error' });
  });

  it('Expect to return an error', async () => {
    stubAdd.throws(new Error('Random error'));
    const req = {
      body: fixture.documentWithoutID,
      params: { id: fixture.document._id },
      header: invalidHeader
    };

    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await commentController.addComment(req, res);
    expect(res.json).be.calledWith({
      status: 'error',
      message: 'Invalid Token'
    });
  });
});
