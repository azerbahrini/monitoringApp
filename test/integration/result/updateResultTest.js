// var chai = require("chai");
// var sinonChai = require("sinon-chai");
// var expect = chai.expect;
// var request = require("supertest");
// const result = require("../../../models/Result");
// const app = require("../../../server");

// chai.use(sinonChai);
// let res;
// describe("PATCH result", () => {
//   before("adding a result before beginning the test", (done) => {
//     res = result({
//       result: { name: "test update" },
//       host: "aa@bb",
//       client: "101",
//       task: "SM12",
//     });
//     res.save().then(() => done());
//   });

//   it("Sends a valid Request", (done) => {
//     const resultId = res._id;

//     request(app)
//       .patch("/api/result/" + resultId.toString())
//       .send({ result: { name: "test update" } })
//       .set("content-type", "application/json")
//       .then((res) => {
//         expect(res.status).to.equal(201);
//         expect(res.body.data).to.be.a("object");
//         expect(res.body.data).to.include.all.keys(
//           "result",
//           "host",
//           "client",
//           "task"
//         );
//         expect(res.body.data._id).to.be.a("string");
//         expect(res.body.data._id).to.be.eq(resultId.toString());
//         done();
//       })
//       .catch((err) => done(err));
//   });

//   it("Sends an invalid request - Wrong ID", async () => {
//     it("Sends a valid Request", async () => {
//       const resultWrongId = "60ef4e3f7221301cc8eaafbe";
//       const res = await request(app)
//         .patch("/api/result/" + resultWrongId)
//         .set("content-type", "application/json");
//       expect(res.status).to.equal(400);
//     });
//   });
//   after((done) => {
//     result.findByIdAndDelete(res._id).then(() => done());
//   });
// });
