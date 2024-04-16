// const sinon = require("sinon");
// const expect = require("chai").expect;
// const chai = require("chai");
// const sinonChai = require("sinon-chai");
// chai.use(sinonChai);
// const fixture = require("./fixture.json");
// const resultController = require("../../../../controllers/result.controller");
// const resultService = require("../../../../services/result");

// describe("controller UPDATE Result test ", () => {
//   let stubUpdate;
//   beforeEach(() => {
//     stubUpdate = sinon.stub(resultService, "updateResult");
//   });
//   afterEach(() => {
//     stubUpdate.restore();
//   });
//   it("expect to return new  Result ", async () => {
//     stubUpdate.returns({
//       data: fixture.update.success.body.data,
//       status: "success",
//     });
//     let req = {
//       body: { ...fixture.update.success.body.data },
//       params: { id: fixture.update.success.body.data.id },
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await resultController.updateResult(req, res);
//     expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
//     expect(res.status).to.have.been.calledWith(201);
//     expect(res.json).be.calledWith({
//       data: fixture.update.success.body.data,
//     });
//   });
//   it("expect to return an error - Invalid Status", async () => {
//     stubUpdate.returns({
//       err: { message: "invalidStatus" },
//       status: "invalidStatus",
//     });
//     let req = {
//       body: { ...fixture.update.success.body.data },
//       params: { id: 123 },
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await resultController.updateResult(req, res);
//     expect(stubUpdate).to.be.calledOnce;
//   });

//   it("expect to return an error - ID Does not exist", async () => {
//     stubUpdate.returns({
//       err: { message: "Result not found" },
//       status: "error",
//       statusCode: 400,
//     });
//     let req = {
//       body: { ...fixture.update.success.body.data },
//       params: { id: 123 },
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await resultController.updateResult(req, res);
//     expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
//     expect(res.status).to.have.been.calledWith(400);
//     expect(res.json).be.calledWith({
//       message: "Result not found",
//     });
//   });

//   it("expect to return an error - Without status Code", async () => {
//     stubUpdate.returns({
//       err: { message: "Result not found" },
//       status: "error",
//       // statusCode: 400, without statusCode
//     });
//     let req = {
//       body: { ...fixture.update.success.body.data },
//       params: { id: 123 },
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await resultController.updateResult(req, res);
//     expect(stubUpdate).to.be.calledWith({ _id: req.params.id }, req.body);
//     expect(res.status).to.have.been.calledWith(400);
//     expect(res.json).be.calledWith({
//       message: "Result not found",
//     });
//   });




// });
