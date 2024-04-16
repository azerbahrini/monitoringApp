const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const Cors = require("cors");
const session = require("express-session");
const logger = require("./config/logger");
const routes = require("./routes");
let syncShiftCron = require("./services/shift/syncShiftCron")

//Register models' schema
const models = require("./models");

const app = express();
app.use(Cors());

//config session
app.use(
  session({
    secret: "bdueifbekfeud",
    resave: true,
    trueresave: true,
    saveUninitialized: true,
  })
);
//cron sync shift
syncShiftCron()

//connect database
connectDB();
var jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(express.json());

// app.get("/", (req, res) => res.send("api running"));

//define routes
app.use("/", routes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`server started at port ${PORT}`);
});
//init socket.io
// const io = require('./socket').init(server);
// let numberConnected = 0;
// io.on('connection', socket => {
//     numberConnected++;
//     logger.trace('A user connected, Total users connected is: ', numberConnected);
//     socket.on('disconnect', function () {
//         logger.trace('A user  disconnected! Total users connected is: ', numberConnected);
//         numberConnected--;
//     });
// })
const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connect",(socket)=>{
  logger.trace('User Has Been Connected', socket.id);
})

module.exports.server = { io: io };
//module.exports = app;
