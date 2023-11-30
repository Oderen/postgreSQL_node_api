const pool = require("../database");
const { ctrlWrappwer, HttpError } = require("../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const path = require("path");
require("dotenv").config({
  override: true,
  path: path.join(__dirname, "../", "../", "dev.env"),
});

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  const isUser = result.rows.length > 0;
  if (!isUser) throw HttpError(401, "Email or password is invalid");

  const user = result.rows[0];
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) throw HttpError(401, "Email or password is invalid");

  const payload = {
    id: user.id,
  };

  const SECRET_KEY = process.env.SECRET_KEY;

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await pool.query(`UPDATE users SET token = '${token}' WHERE id = ${user.id}`);

  res.status(201).json({
    token,
    user: {
      email,
    },
  });
};

module.exports = {
  login: ctrlWrappwer(login),
};
