const User = require("./../modules/user.module");
const registerValidator = require("./../validators/register.validator");
const loginValidator = require("./../validators/login.validator");
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

    req.session.userId = addedUser._id;
    req.session.userRole = addedUser.role;

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
    const validationResult = registerValidator(req.body);
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
      res
        .status(401)
        .json({ isLoggedIn: false, message: "wrong username or password2" });
    }

    req.session.userId = user._id;
    req.session.role = user.role;

    res.status(200).json({ isLoggedIn: true, message: "You are logged in!" });
  } catch (error) {
    res.status(401).json({ isLoggedIn: false, message: error.message });
  }
};

exports.logout = (req, res) => {
  delete req.session.userId;
  delete req.session.role;
  res.json({ message: "You logged out" });
};

exports.loginRequired = async (req, res, next) => {
  try {
    if (req.session === undefined || req.session.userId === undefined) {
      return res
        .status(403)
        .json({ message: "You need to login to acces this route" });
    }

    const user = await getUserById(req, res);

    if (user === null) {
      return res.status(404).json({ messgae: "User doesn't exist" });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};
