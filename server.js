const pool = require("./database/Pool");
const { http } = require("./socket");

(async () => {
  try {
    await pool.connect();
    http.listen(3000, () => {
      console.log("Server is running");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
})();
