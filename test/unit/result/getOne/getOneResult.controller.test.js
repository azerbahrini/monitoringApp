// const sinon = require('sinon');
// const chai = require('chai');
// const sinonChai = require('sinon-chai');
// const expect = chai.expect;
// chai.use(sinonChai);
// const fixture = require('./fixture.json');
// const resultController = require('../../../../controllers/result.controller');
// const resultService = require('../../../../services/result');

// describe('controller get One result test ', () => {
//   let stubGetOne;
//   const taskID = '609089d12b4129a8102c875d';
//   beforeEach(() => {
//     stubGetOne = sinon.stub(resultService, 'getByTaskId');
//   });
//   afterEach(() => {
//     stubGetOne.restore();
//   });

//   it('expect to send one Result', async () => {
//     stubGetOne.returns({
//       data: fixture.foundResult,
//       status: 'success',
//       statusCode: 200
//     });
//     const req = { body: {}, params: { id: taskID }, query: {} };
//     const res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await resultController.getOneResult(req, res);
//     expect(stubGetOne).to.be.calledOnce;
//     expect(stubGetOne).be.calledWith(taskID);
//     expect(res.status).to.have.been.calledWith(200);
//     expect(res.json).be.calledWith({ data: fixture.foundResult });
//   });
//   it('expect return Invalid ID error', async () => {
//     const req = { body: {}, params: { id: 'invalid ID' }, query: {} };
//     const res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await resultController.getOneResult(req, res);
//     expect(res.status).to.have.been.calledWith(400);
//     expect(res.json).be.calledWith({ message: 'Invalid Object ID' });
//   });

//   it('expect to return an error', async () => {
//     stubGetOne.returns({
//       err: { message: 'error' },
//       status: 'error',
//       statusCode: 400
//     });
//     const req = { body: {}, params: { id: taskID }, query: {} };
//     const res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await resultController.getOneResult(req, res);
//     expect(stubGetOne).to.be.calledOnce;
//     expect(stubGetOne).be.calledWith(taskID);
//     expect(res.status).to.have.been.calledWith(400);
//     expect(res.json).be.calledWith({ message: 'error' });
//   });
//   it('expect to return an error - Invalid status', async () => {
//     stubGetOne.returns({
//       err: { message: 'error' },
//       status: 'Invalid status Code',
//       statusCode: 400,
//     });
//     const req = { body: {}, params: { id: taskID }, query: {} };
//     const res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await resultController.getOneResult(req, res);
//     expect(stubGetOne).to.be.calledOnce;
//     expect(stubGetOne).be.calledWith(taskID);
//   });
// });
