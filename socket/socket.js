const app = require("../app");
const server = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

module.exports = { socketIO, server };
