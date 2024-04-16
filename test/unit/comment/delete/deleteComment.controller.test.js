const sinon = require('sinon');
const expect = require('chai').expect;
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const fixture = require('../fixture.json');
const commentController = require('../../../../controllers/comment.controller');
const commentService = require('../../../../services/comment');
const roleService = require('../../../../services/role');

describe('controller deleteComment Test ', () => {
  let stubDelete;
  let stubGetRoles;
  let stubGet;
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3OTZiNTAwMzJmMDM2YTQ4ZGI4YTU0In0sImlhdCI6MTY0MzI5MDMyOSwiZXhwIjoxNjQzMzI2MzI5fQ._QLwWA01Eh7D5PFpDayT6NqIyJbtrTz_qMQgE2_b9uA';
  function header() {
    return token;
  }
  const token2 = 'eyJ5MDMyOSwiZXhwIjoxNjQzMzI2qMQgE2_b9uA';
  function header2() {
    return token2;
  }
  beforeEach(() => {
    stubDelete = sinon.stub(commentService, 'deleteComment');
    stubGet = sinon.stub(commentService, 'getCommentByID');
    stubGetRoles = sinon.stub(roleService, 'getRolesForUsers');
  });
  afterEach(() => {
    stubDelete.restore();
    stubGet.restore();
    stubGetRoles.restore();
  });
  it('expect to return success ', async () => {
    stubDelete.returns(fixture.deletedResult);
    stubGet.returns(fixture.comment);
    stubGetRoles.returns(fixture.roles);
    const req = {
      body: {},
      header,
      params: { id: fixture.document.feed }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await commentController.deleteComment(req, res);
    expect(stubDelete).to.be.calledWith(fixture.document.feed);
    expect(res.json).be.calledWith({
      status: 'success',
      data: {
        isActive: false,
        _id: '61dc30750ae7e613e45b0bba',
        content: 'this is the content of the comment',
        feed: '6061f415eda4ab2cc80ef660',
        user: '61796b50032f036a48db8a54',
        createdAt: '2022-01-10T13:11:17.848Z',
        updatedAt: '2022-01-10T13:11:17.848Z',
        __v: 0
      },
      message: 'Successfully deleted the comment'
    });
  });
  it('expect to return an error ', async () => {
    stubDelete.returns({
      err: { message: 'an error ocurred' },
      status: 'error',
      statusCode: 400
    });
    stubGet.returns(fixture.comment);
    stubGetRoles.returns(fixture.roles);
    const req = {
      body: {},
      header,
      params: { id: fixture.document.feed }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await commentController.deleteComment(req, res);
    expect(stubDelete).to.be.calledWith(fixture.document.feed);
    expect(res.json).be.calledWith({
      status: 'error',
      message: 'an error ocurred',
      statusCode: 400
    });
  });

  it('expect to return an error - 204 comment not found', async () => {
    stubGet.returns({
      err: { message: 'comment not found' },
      status: 'success',
      statusCode: 204
    });
    const req = {
      body: {},
      header,
      params: { id: fixture.document._id }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await commentController.deleteComment(req, res);
    expect(stubGet).to.be.calledOnce;
    expect(stubGet).to.be.calledWith(fixture.document._id);
    expect(res.json).be.calledWith({
      status: 'success',
      message: 'comment not found'
    });
  });

  it('expect to return an error - 401 - Invalid Token ', async () => {
    stubGet.returns(fixture.comment);
    const req = {
      body: {},
      header: header2,
      params: { id: fixture.document._id }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await commentController.deleteComment(req, res);
    expect(stubGet).to.be.calledOnce;
    expect(stubGet).to.be.calledWith(fixture.document._id);
    expect(res.json).be.calledWith({
      status: 'error',
      message: 'Invalid Token'
    });
  });

  it('expect to return an error - 403 - not authorized  ', async () => {
    stubDelete.returns(fixture.deletedResult);
    stubGet.returns(fixture.comment2);
    stubGetRoles.returns(fixture.roles2);
    const req = {
      body: {},
      header,
      params: { id: fixture.document._id }
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    await commentController.deleteComment(req, res);
    expect(stubGet).to.be.calledOnce;
    expect(stubGet).to.be.calledWith(fixture.document._id);
    expect(res.json).be.calledWith({
      status: 'error',
      message: 'You are not authorized to edit this comment'
    });
  });
});
