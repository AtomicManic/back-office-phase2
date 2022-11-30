const expressSession = require("express-session");
const { IS_PRODUCTION } = require("./../config/config");

expressSession({
  name: "backoffice.sid",
  resave: "false",
  saveUninitializes: false,
  secret: process.env.SESSION_SECRET || "very secret",
  cookie: {
    secure: IS_PRODUCTION,
    maxAge: 1000 * 60 * 60 * 24,
  },
});

module.exports = {
  expressSession: expressSession,
};
