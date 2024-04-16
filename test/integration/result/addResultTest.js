// var chai = require("chai");
// var sinonChai = require("sinon-chai");
// var expect = chai.expect;
// var request = require("supertest");
// var result = require("../../../models/Result");
// const app = require("../../../server");

// chai.use(sinonChai);
// let id;
// describe("Add a result", () => {
//   it("Sends a valid Request", async () => {
//     const result = {
//         result: { name: "test add" },
//         host: "aa@bb",
//         client: "101",
//         task: "SM37",
//       };
//     const res = await request(app)
//       .post("/api/result")
//       .set("content-type", "application/json")
//       .send(result);
//     expect(res.status).to.equal(201);
//     expect(res.body.data).to.be.a("object");
//     expect(res.body.data).to.have.property("result");
//         expect(res.body.data).to.have.property("host");
//         expect(res.body.data).to.have.property("client");
//         expect(res.body.data).to.have.property("task");
//     expect(res.body.data._id).to.be.a("string");
//     id = res.body.data._id.toString();
//   });

//   it("Sends an invalid request - empty body", async () => {
//     const res = await request(app)
//       .post("/api/result")
//       .set("content-type", "application/json")
//       .send({});

//     expect(res.status).to.equal(400);
//   });
//   it("Send an invalid request - missing property", async () => {
//     const res = await request(app)
//       .post("/api/result")
//       .set("content-type", "application/json")
//       .send({ host: "boomi" });
//     expect(res.status).to.equal(400);
//   });
//   after((done) => {
//     result.findByIdAndDelete(id).then(() => done());
//   });
// });
