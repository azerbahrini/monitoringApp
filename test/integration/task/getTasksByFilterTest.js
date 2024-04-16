// const chai = require("chai");
// const sinonChai = require("sinon-chai");
// const expect = chai.expect;
// const request = require("supertest");
// let express = require("express");
// const app = require("../../../server");
// chai.use(sinonChai);
// const moment = require('moment');
// const User = require("../../../models/User");
// const Shift = require("../../../models/Shift");
// const System = require("../../../models/System");
// const Customer = require("../../../models/Customer");
// const Map = require("../../../models/MonitoringActivityPlannification");

// let teamLeader;
// let member;
// let shift1;
// let shift2;
// let system;
// let customer;
// let map;

// describe("GET tasks by filter", () => {
//     before("adding documents before beginning the test",(done) => {
//          teamLeader = User({
//             "_id": "61796b51032f03506fdb8a6c", "status": true, "isActive": true,
//             "firstName": "Fouad", "lastName": "Kanzaoui",
//             "email": "fouad.kanzaoui@avaxia-group.com", "password": "$2a$10$wHJtWcVYS9OxVn4HWyCsfOqoAiHrVwoU62xNrXlxKmlx.8eZ0dAhu",
//             "phoneNumber": "NaN", "avatar": null, "Level": null, "microsoftId": "9fac4c7a-0cf0-4bcb-aa85-8fde04365925",
//             "createdAt": "2021-10-27T15:08:01.653Z", "updatedAt": "2021-11-14T17:23:52.606Z"
//         });
//         teamLeader.save();
//          member = User({
//             "_id": { "$oid": "61796b52032f032893db8ab1" }, "status": true, "isActive": true,
//             "firstName": "Firas", "lastName": "Argoubi",
//             "email": "firas.argoubi@avaxia-group.com", "password": "$2a$10$QYiuF95JDMGkZDawxPL6YuomMA35ycaI/85gKkYaYFXtD/6qjP11G",
//             "phoneNumber": "NaN", "avatar": null, "Level": null, "microsoftId": "c5da070e-757a-4529-b692-bb8a13c1c2b3",
//             "createdAt": { "$date": "2021-10-27T15:08:01.653Z" }, "updatedAt": { "$date": "2021-11-14T17:23:52.606Z" }
//         });
//         member.save();
//          shift1 = Shift({
//             "_id": { "$oid": "6192270ccad92814e6ebce2e" }, "role": { "$oid": "5fa02d8f785e4681ddfa3a6e" },
//             "shiftId": "SHFT_fbf14e97-fccf-4d43-93a0-4fa81a63de02", "userMicrosoftId": "9fac4c7a-0cf0-4bcb-aa85-8fde04365925",
//             "name": "Daily shift", "startDate": { "$date": moment().utc().format() },
//             "endDate": { "$date": moment().utc().add(10, 'h').format() },
//             "updatedShiftAt": { "$date": "2021-10-30T19:29:44.655Z" }, "user": { "$oid": "61796b51032f03506fdb8a6c" }, "type": "shift",
//             "reference": null, "theme": "darkPink", "color": "#a4262c", "typeId": "61796b3f032f038c61db89fc",
//             "createdAt": { "$date": "2021-11-15T02:00:07.741Z" }, "updatedAt": { "$date": "2021-11-15T02:00:07.741Z" }
//         });
//         shift1.save();
//         shift2 = Shift({
//         "_id": { "$oid": "6192270ccad92814e6ebce2e" }, "role": { "$oid": "5fa02d8f785e4681ddfa3a6d" },
//             "shiftId": "SHFT_fbf14e97-fccf-4d43-93a0-4fa81a63de12", "userMicrosoftId": "c5da070e-757a-4529-b692-bb8a13c1c2b3",
//             "name": "Daily shift", "startDate": { "$date": moment().utc().format() },
//              "endDate": { "$date": moment().utc().add(10, 'h').format() },
//             "updatedShiftAt": { "$date": "2021-10-30T19:29:44.655Z" }, "user": { "$oid": "61796b52032f032893db8ab1" }, "type": "shift",
//             "reference": null, "theme": "darkPink", "color": "#a4262c", "typeId": "61796b3f032f038c61db89fc",
//             "createdAt": { "$date": "2021-11-15T02:00:07.741Z" }, "updatedAt": { "$date": "2021-11-15T02:00:07.741Z" }
//         });
//         shift2.save();
//          system = System({
//             "_id": { "$oid": "617fb85c383afb640346696f" }, "listTechnicalUser": [], "listCustomerContact": [],
//              "isActive": true, "name": "systemName", "type": null, "category": null, "class": null,
//              "customer": { "$oid": "617812057a088f333a561f58" }, "createdAt": { "$date": "2021-11-01T09:50:20.764Z" },
//               "updatedAt": { "$date": "2021-11-01T09:50:20.963Z" }
//         });
//         system.save();
//          customer = Customer({
//             "_id": { "$oid": "617812057a088f333a561f58" }, "timeZone": ["Africa/Tunis"], "listMonitoringType": null,
//              "contactsForReports": [], "isActive": false, "label": "Aziz", "address": "Tunis Bab souika",
//               "firstReport": "10:20", "logo": "defaultCustomerLogo.png", "createdAt": { "$date": "2021-10-26T14:34:45.682Z" },
//                "updatedAt": { "$date": "2021-10-26T14:34:45.682Z" }
//         });
//         customer.save();
//          map = Map({
//             "_id":{"$oid":"616561f922324be1b2a84301"},"active":false,"periodicity":240,"estimation":240,"system":{"$oid":"617fb85c383afb640346696f"},"monitoringAct":{"$oid":"608bc9e4c5a2a01a8172948c"},"startTime":550,"createdAt":{"$date":"2021-10-12T10:22:49.145Z"},"updatedAt":{"$date":"2021-10-12T10:22:58.106Z"}
//         });
//         map.save().then(() => done());
//     });
//     it("Sends a valid Request", (done) => {
//         let query = {
//             customerId: "617812057a088f333a561f58",
//             memberId: "61796b52032f032893db8ab1",
//             timeZone: "Africa/Tunis",
//             teamLeaderId: "61796b51032f03506fdb8a6c"
//         };
//         request(app)
//             .get("/api/task/getTasksByFilter")
//             .set("content-type", "application/json")
//             .query(query)
//             .then((res)=>{    
//         expect(res.status).to.equal(200);
//         expect(res.body.data).to.be.a('array');
//         expect(res.body.data[0]).to.be.a("object");
//         //expect(res.body.data[0]).to.include.all.keys('title', 'description', '_id', 'priority', 'user');
//         expect(res.body.data[0].globalStatus).to.be.a("Good");
//             done();
//         })
//         .catch((err) => done(err));
//     });

//     // it("Sends an invalid request - wrong route", async () => {
//     //     const res = await request(app)
//     //         .get("/api/tasks/getTasksByFilter")
//     //         .set("content-type", "application/json")
//     //         .send({});

//     //     expect(res.status).to.equal(404);
//     // });
//     after(() => {
//         User.findByIdAndDelete("61796b51032f03506fdb8a6c").then(() => done());
//     });
// });
