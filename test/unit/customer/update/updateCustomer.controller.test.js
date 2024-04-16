// const sinon = require("sinon");
// const expect = require("chai").expect;

// const fixture = require("../fixture.json");
// const customerController = require("../../../../controllers/customer.controller");
// const customerService = require("../../../../services/customer");

// describe("controller UPDATE Customer test ", () => {
//   let stubUpdate;
//   beforeEach(() => {
//     stubUpdate = sinon.stub(customerService, "updateCustomerService");
//   });
//   afterEach(() => {
//     stubUpdate.restore();
//   });
//   it("expect to return new customer ", async () => {
//     stubUpdate.returns({
//       data: fixture.customerDataTest,
//       status: "success",
//     });
//     let req = {
//       body: { ...fixture.customerDataTest },
//       params: { id: fixture.customerDataTest._id },
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await customerController.updateCustomer(req, res);
//     expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
//     expect(res.status).to.have.been.calledWith(201);
//     expect(res.json).be.calledWith({
//       data: fixture.customerDataTest,
//     });
//   });

//   it("expect to return an error - ID Does not exist", async () => {
//     stubUpdate.returns({
//       err: { message: "customer not found" },
//       status: "error",
//       statusCode: 404,
//     });
//     let req = {
//       body: { ...fixture.customerDataTest },
//       params: { id: fixture.wrongID },
//     };
//     let res = {};
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//     await customerController.updateCustomer(req, res);
//     expect(stubUpdate).to.be.calledWith(req.params.id, req.body);
//     expect(res.status).to.have.been.calledWith(404);
//     expect(res.json).be.calledWith({
//       message: "customer not found",
//     });
//   });
// });
