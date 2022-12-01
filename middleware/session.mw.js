const expressSession = require("express-session");
const { IS_PRODUCTION } = require("./../config/config");

sessionConfig = {
  name: "backoffice.sid",
  resave: "false",
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || "very secret",
  cookie: {
    secure: IS_PRODUCTION,
    maxAge: 1000 * 60 * 60 * 24,
  },
};

module.exports = {
  sessionConfig: sessionConfig,
};
