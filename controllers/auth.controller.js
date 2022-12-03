const User = require("./../modules/user.module");
const registerValidator = require("./../validators/register.validator");
const loginValidator = require("./../validators/login.validator");
const UserObj = require("./../classes/User");
const jwt = require("jsonwebtoken");
const {
  addNewUser,
  getUserByEmail,
  getUserById,
} = require("./../DAL/user.DAL");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { dbSecretFields } = require("./../config/config");

exports.register = async (req, res) => {
  const validationResult = registerValidator(req.body);
  try {
    if (!validationResult) {
      return res.status(400).json({ message: validationResult });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = { ...req.body, password: hashedPassword };

    const addedUser = await addNewUser(user);

    return res.status(201).json({
      message: "user added successfully!",
      user: _.omit((await addedUser).toObject(), dbSecretFields),
    });
  } catch (error) {
    res.status(400).json({ message: "Register unsuccessful..." });
  }
};

exports.login = async (req, res) => {
  try {
    const validationResult = loginValidator(req.body);
    if (!validationResult) {
      return res
        .status(400)
        .json({ isLoggedIn: false, message: validationResult });
    }

    const user = await getUserByEmail(req, res);

    if (user === null) {
      return res
        .status(404)
        .json({ isLoggedIn: false, message: "wrong username or password1" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ isLoggedIn: false, message: "wrong username or password2" });
    }

    const userObj = new UserObj(user.id, user.role);
    const token = jwt.sign({ userObj }, process.env.TOKEN_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      isLoggedIn: true,
      role: user.role,
      message: "You are logged in!",
    });
  } catch (error) {
    res.status(401).json({ isLoggedIn: false, message: error.message });
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.end();
};

exports.loginRequired = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    const { userObj } = jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(403).json({ message: "Unverified action" });
  }
};
