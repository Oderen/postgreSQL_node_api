const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!Number.isInteger(id) && id <= 0)
    next(HttpError(404, `${id} is not a valid id`));

  next();
};

module.exports = { isValidId };
