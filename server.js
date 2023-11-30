const pool = require("./database/Pool");
const { server, socketIO } = require("./socket");

socketIO.on("connect", (socket) => {
  console.log(`User connected`);

  socket.on("disconnect", () => {
    console.log(" User disconnected");
  });
});

(async () => {
  try {
    await pool.connect();
    server.listen(2222, () => {
      console.log("Server is running");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
})();
