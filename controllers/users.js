const pool = require("../database");
const { ctrlWrappwer, HttpError } = require("../helpers");
const bcrypt = require("bcryptjs");

const path = require("path");
require("dotenv").config({
  override: true,
  path: path.join(__dirname, "../", "../", "dev.env"),
});

const createUser = async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;

  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  const isUser = result.rows.length > 0;
  if (isUser) throw HttpError(409, "Email in use");

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await pool.query(
    "INSERT INTO users (first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [first_name, last_name, email, phone, hashPassword]
  );

  res.status(201).json(newUser.rows[0]);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  if (result.rows.length <= 0) {
    throw HttpError(404, "Not Found");
  }

  const user = result.rows[0];

  res.status(200).json(user);
};

const updateUserbyID = async (socketIO, req, res) => {
  const { id } = req.params;

  const { first_name, last_name, email, phone, password } = req.body;
  let passInfo = password;
  if (password) passInfo = await bcrypt.hash(password, 10);

  await pool.query(
    `UPDATE users SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}', phone = '${phone}', password = '${passInfo}' WHERE id = ${id}`
  );

  socketIO.emit("userUpdate", {
    message: `User ${first_name} ${last_name} was successfully updated`,
  });

  res.status(200).json({
    message: `User ${first_name} ${last_name} was successfully updated`,
  });
};

module.exports = {
  createUser: ctrlWrappwer(createUser),
  getUserById: ctrlWrappwer(getUserById),
  updateUserbyID: ctrlWrappwer((req, res) =>
    updateUserbyID(require("../socket").socketIO, req, res)
  ),
};
