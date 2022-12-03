const Validator = require("fastest-validator");
const loginValidator = new Validator();

const schema = {
  email: { type: "string" },
  password: { type: "string" },

  $$strict: true,
};

const checker = loginValidator.compile(schema);
module.exports = checker;
