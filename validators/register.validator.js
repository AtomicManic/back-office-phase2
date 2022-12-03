const Validator = require("fastest-validator");
const registerValidator = new Validator();

const schema = {
  username: { type: "string", min: 3, max: 20 },
  password: { type: "string" },
  name: { type: "string", min: 3, max: 60 },
  role: { type: "string" },
  $$strict: true,
};

const checker = registerValidator.compile(schema);
module.exports = checker;
