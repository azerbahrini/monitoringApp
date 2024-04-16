const chai = require("chai");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
const request = require("supertest");
var moment = require("moment-timezone");

let express = require("express");

const app = require("../../../server");
let Task = require("../../../models/Task");
let Shift = require("../../../models/Shift");

chai.use(sinonChai);
let task;
let shift ;
describe("GET ALL task", () => {
  before("adding task before beginning the test", (done) => {
   
    shift = Shift ({
        role: "5fa02d8f785e4681ddfa3a6d",
        shiftId: null,
        userMicrosoftId: null,
        name: "app_GS",
        startDate: "2021-11-11T00:00:00.000Z",
        endDate: "2031-11-12T00:00:00.000Z",
        updatedShiftAt: "2021-10-27T15:07:48.000Z",
        user: "61796c869f950f6bc0e40315",
        type: "shift",
        reference:
          "5fa02d8f785e4681ddfa3a6dcabe7d5d-b871-41ec-9d8d-19479d645fdd2031",
        theme: null,
        color: null,
        typeId: null,
        createdAt: "2021-10-27T15:07:48.896Z",
        updatedAt: "2021-10-27T15:07:48.896Z",
    })
   
    shift.save()
    task = Task({
      title: "SP01 aaazaz",
      description: "SAP Transaction Task",
      type: "Monitoring",
      map: "60d378780f8a7aa8fe464aae",
      globalStatus: "Good",
      estimatedStart: "2021-11-20T09:00:00Z",
      state: "Done",
      assignee: "61796c869f950f6bc0e40315",
      system: "608beed8c5a2a0c3017294b9",
      priority: 2,
    });
    task.save().then(() => done());
  });
  it("Sends a valid Request - 204 No DATA", async () => {
    let query = {
        searchValue : "SP01",
        type : JSON.stringify(["Monitoring"]),
        state : JSON.stringify(["Done", "Pending"]),
        timeZone : "Asia/Taipei"
    };

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3OTZjODY5Zjk1MGY2YmMwZTQwMzE1IiwiaXAiOiI6OmZmZmY6MTcyLjIwLjAuODEiLCJhY2Nlc3NUb2tlbiI6ImV5SjBlWEFpT2lKS1YxUWlMQ0p1YjI1alpTSTZJbXBCZEhCU1JVZENiVlJWZUV4d1lsOUJaVmhaZDFOT1V5MW9SRWhxVTNZeFExSm5ZbFpTYVhSQ2NGRWlMQ0poYkdjaU9pSlNVekkxTmlJc0luZzFkQ0k2SW13emMxRXROVEJqUTBnMGVFSldXa3hJVkVkM2JsTlNOelk0TUNJc0ltdHBaQ0k2SW13emMxRXROVEJqUTBnMGVFSldXa3hJVkVkM2JsTlNOelk0TUNKOS5leUpoZFdRaU9pSXdNREF3TURBd015MHdNREF3TFRBd01EQXRZekF3TUMwd01EQXdNREF3TURBd01EQWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwzTjBjeTUzYVc1a2IzZHpMbTVsZEM4M1pXTm1NV1JqWWkxbFkyRXpMVFEzTWpjdE9ESXdNUzAwT1dObU5HTTVOR0kyTmprdklpd2lhV0YwSWpveE5qTTFOVFF6TnpFd0xDSnVZbVlpT2pFMk16VTFORE0zTVRBc0ltVjRjQ0k2TVRZek5UVTBPREl3TUN3aVlXTmpkQ0k2TUN3aVlXTnlJam9pTVNJc0ltRnBieUk2SWtVeVdtZFpTbWcyY25sQ2MzaFRVa1pyS3paeU5HOW1UVlJtWm5kd2FsUXZVMlpKVEhwT2VDOVdaWEpQYUdFd1MxUlhTVUVpTENKaGJYSWlPbHNpY0hka0lsMHNJbUZ3Y0Y5a2FYTndiR0Y1Ym1GdFpTSTZJazV2WkdVdWFuTWdSM0poY0dnZ0lpd2lZWEJ3YVdRaU9pSmtPVFExTW1RMFlpMDNZamt3TFRRNVkySXRPVFpoT1Mxa1ltUXdNMkppWW1NeFpXTWlMQ0poY0hCcFpHRmpjaUk2SWpBaUxDSm1ZVzFwYkhsZmJtRnRaU0k2SWtOb1lYSnVaWGtpTENKbmFYWmxibDl1WVcxbElqb2lUV1ZrSUV0b1lXeHBiQ0lzSW1sa2RIbHdJam9pZFhObGNpSXNJbWx3WVdSa2NpSTZJakU1Tnk0ekxqRXpNQzR5TkRZaUxDSnVZVzFsSWpvaVRXVmtJRXRvWVd4cGJDQkRhR0Z5Ym1WNUtHVjRkQ2tpTENKdmFXUWlPaUl5TURNME1UQmhZUzB4TVRSa0xUUXdabU10T1dFMVlpMDRaR0U1TUdNNFl6QmxNR0lpTENKd2JHRjBaaUk2SWpVaUxDSndkV2xrSWpvaU1UQXdNekl3TURFM09ERTFPVFkwUlNJc0luSm9Jam9pTUM1QlVqaEJlWGd6VUdaeFVITktNR1ZEUVZWdVVGUktVekpoVlhOMFVtUnRVV1U0ZEVwc2NXNWlNRVIxTjNkbGQyWkJTRGd1SWl3aWMyTndJam9pUTJoaGJtNWxiQzVTWldGa1FtRnphV011UVd4c0lFTm9ZVzV1Wld4TlpYTnpZV2RsTGxKbFlXUXVRV3hzSUVOb1lXNXVaV3hOWlhOellXZGxMbE5sYm1RZ1JHbHlaV04wYjNKNUxsSmxZV1F1UVd4c0lFZHliM1Z3TGxKbFlXUXVRV3hzSUVkeWIzVndMbEpsWVdSWGNtbDBaUzVCYkd3Z1IzSnZkWEJOWlcxaVpYSXVVbVZoWkM1QmJHd2dVMk5vWldSMWJHVXVVbVZoWkM1QmJHd2dWR1ZoYlM1U1pXRmtRbUZ6YVdNdVFXeHNJRlZ6WlhJdVVtVmhaQ0JWYzJWeUxsSmxZV1F1UVd4c0lGVnpaWEl1VW1WaFpFSmhjMmxqTGtGc2JDQndjbTltYVd4bElHOXdaVzVwWkNCbGJXRnBiQ0lzSW5OMVlpSTZJbTkyZFZwWFdrWTFlV28zU1hSZlkxSXlRVzlIT0cxeGNGUTBhekZ6VkdaMGFFaElUWFJTU0VoVVNtTWlMQ0owWlc1aGJuUmZjbVZuYVc5dVgzTmpiM0JsSWpvaVJWVWlMQ0owYVdRaU9pSTNaV05tTVdSallpMWxZMkV6TFRRM01qY3RPREl3TVMwME9XTm1OR001TkdJMk5qa2lMQ0oxYm1seGRXVmZibUZ0WlNJNkltMWxaR3RvWVd4cGJDNWphR0Z5Ym1WNVFHRjJZWGhwWVMxbmNtOTFjQzVqYjIwaUxDSjFjRzRpT2lKdFpXUnJhR0ZzYVd3dVkyaGhjbTVsZVVCaGRtRjRhV0V0WjNKdmRYQXVZMjl0SWl3aWRYUnBJam9pY25CUlFVTndkRzFwYTB0RlZEVlBPVTVzV1dwQlFTSXNJblpsY2lJNklqRXVNQ0lzSW5odGMxOXpkQ0k2ZXlKemRXSWlPaUozWjFkT2EyZGtiV2xvVUV0eGRFSkdWemhTUzJOT1VEaHdaMEpzTkVVeGExRjRXSFF5VWtwcWIwZEJJbjBzSW5odGMxOTBZMlIwSWpveE5UQTFNakU1TnpNMWZRLlE4WVo2RXpwUFlqTGdaX1o1TUQ5V0VtTElJaktoaDBaR1J3X3ctMnJVOVJBTXhNZ2ZpeUdnVHpNSkJZVktCUk1VYXBjRERvNzRLQWh4c0tpb3d2dWhKeWN3RDg2RTVFb20wUTB1c0RsQ2FvRkcycHZ3dFFKZGE0Q0hhN1Y3WEZhbjNfdEVodkVoeVh0MUdrMlFWaWp5YS1MWUFTaEJpWkpDRjNwN083dzNLUlBYbkZpRC16MFFwYWlCWVo4ZVprNVA5d2FxcnkxX3hqRk00VkQyNk1Zb2wxYm4xOE9oZHU3cDVwcEZ4ZEwtZEx2NUQydkxyQlJZeW5zclc1Z2YzQmN3dlJDc2JBNmVYdHF6MkFKbzNVZW5aSnQ1NkEzMTFpbmZjZG5SN2NUbWFmYVVlQlNJMVZTcTRWY2E3b3RyNHAzMzEzZGQtQndSaEVmTDJ0YXprZlo5USJ9LCJpYXQiOjE2MzU1NDQwMTEsImV4cCI6MTYzNTU3MjgxMX0.9IhziLe9YbzN6TRoPNOJlx7aYmAsQbm80EK-4heTf_E"


    const res = await request(app)
      .get("/api/task/getFiltredTasks")
      .set("content-type", "application/json")
      .set("x-auth-accessToken" ,token )
      .query(query);
    expect(res.status).to.equal(204);
    expect(res.body).to.be.a("object");
  });

  it("Sends an invalid request - wrong route", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("content-type", "application/json")
      .send({});

    expect(res.status).to.equal(404);
  });
  after(() => {
    Shift.findByIdAndDelete(shift._id).then(() => done());
    Task.findByIdAndDelete(task._id).then(() => done());
  });
});
