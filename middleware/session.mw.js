const expressSession = require("express-session");
const { IS_PRODUCTION } = require("./../config/config");

sessionConfig = {
  name: process.env.SESSION_NAME,
  resave: "false",
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || "very secret",
  cookie: {
    maxAge: 360000,
    expires: false,
  },
};

module.exports = {
  sessionConfig: sessionConfig,
};
