const express = require("express");

const ctrl = require("../../controllers");
const { validateBody, isValidId } = require("../../middleware");
const { userSchema, updateSchema } = require("../../schemas");

const router = express.Router();

router.post("/", validateBody(userSchema), ctrl.createUser);

router.get("/:id", isValidId, ctrl.getUserById);

router.put("/:id", validateBody(updateSchema), isValidId, ctrl.updateUserbyID);

module.exports = router;
