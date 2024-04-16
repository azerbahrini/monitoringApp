// const sinon = require("sinon");
// const expect = require("chai").expect;
// const chai = require("chai");
// const sinonChai = require("sinon-chai");
// chai.use(sinonChai);
// const fixture = require("./fixture.json");
// const resultController = require("../../../../controllers/result.controller");
// const resultService = require("../../../../services/result");
// describe("controller add a result ", () => {
//   let stubAdd;
//   beforeEach(() => {
//     stubAdd = sinon.stub(resultService, "addResult");
//   });
//   afterEach(() => {
//     stubAdd.restore();
//   });
//   it("send a correct result object ", async () => {
//     stubAdd.returns({
//       data: fixture.add.success.body.data,
//       status: "success",
//     });
//     let req = {
//       body: { ...fixture.add.success.body.data },
//       params: {},
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await resultController.addResult(req, res);
//     expect(stubAdd).to.be.calledWith(req.body);
//     expect(res.status).to.have.been.calledWith(201);
//     expect(res.json).be.calledWith({
//       data: fixture.add.success.body.data,
//     });
//   });
//   it("expect to return an error - Invalid Status", async () => {
//     stubAdd.returns({
//       err: { message: "invalidStatus" },
//       status: "invalidStatus",
//     });
//     let req = {
//       body: { active: fixture.add.success.body.data[0].result },
//       params: {},
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await resultController.addResult(req, res);
//     expect(stubAdd).to.be.calledOnce;
//   });
//   it("send a wrong data form - Missing Property", async () => {
//     stubAdd.returns({
//       err: { message: "missing property" },
//       status: "error",
//     });
//     let req = {
//       body: { active: fixture.add.success.body.data[0].result },
//       params: {},
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await resultController.addResult(req, res);
//     expect(stubAdd).to.be.calledWith(req.body);
//     expect(res.status).to.have.been.calledWith(400);
//     expect(res.json).be.calledWith({
//       message: "missing property",
//     });
//   });
// });
