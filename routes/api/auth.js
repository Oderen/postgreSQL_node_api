const express = require("express");

const ctrl = require("../../controllers");
const { validateBody } = require("../../middleware");
const { loginSchema } = require("../../schemas/users");

const router = express.Router();

router.post("/login", validateBody(loginSchema), ctrl.login);

module.exports = router;
